import React, { useState, useEffect } from "react";
import { header, footer } from "../app/globals.tsx";
import { categorySum } from "../lib/_API_Methods.tsx";
import "@/app/globals.css";
import "@/pages/table.css";

async function fetchCategories() {
  try {
    const response = await fetch('/api/getCategory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('API Response:', data); // Log the response to inspect it

    if (response.ok && data.category) {
      return data;
    } else {
      console.error('Error fetching category data:', data.message || 'Unknown error');
      return { category: [] }; // Return an empty array if there's an error or no categories found
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return { category: [] }; // Return an empty array if there's a fetch error
  }
}


const CategoryInput = () => {
  // State for amount and name
  const [categoryAmount, setCategoryAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const budget_id: number = 1;
  // Event handlers
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryAmount(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  // record the category and amount to the database
  const enterCategory = async () => {
    setSubmitMessage("");

    const getCurrentMonth = () => {
      const date = new Date();
      const month = date.getMonth() + 1; // getMonth() returns month index starting from 0 (January) to 11 (December)
      const year = date.getFullYear();
      return `${year}-${month < 10 ? '0' : ''}${month}-01`; // Format as YYYY-MM
    };

    console.log("Category Name:", categoryName, "Category Amount:", categoryAmount, "Month:", getCurrentMonth());

    // API calls to add category can be made here
    try {
      // Make the API request to the endpoint
      const response = await fetch("/api/createCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: categoryName, category_limit: categoryAmount, month: getCurrentMonth() }),
      });

      const data = await response.json();
      console.log("Data:", data);
      if (response.ok) {
        setSubmitMessage("Post Successful!");
      } else {
        setSubmitMessage("Post Failed: " + data.message + " " + data.error);
        console.log("ERROR with createCategory" + data.message);
      }
    } catch (error) {
      setSubmitMessage("Error logging in: " + error);
    }
  };

  return (
    <>
      <h2>Add Categories</h2>
      <div>
        <input
          className="inputBudget"
          name="categoryName"
          placeholder="Enter category name"
          value={categoryName}
          onChange={handleNameChange}
          style={{ width: "42%" }}
        />
        <input
          className="inputBudget"
          name="categoryAmount"
          placeholder="Enter category amount"
          value={categoryAmount}
          onChange={handleAmountChange}
          style={{ width: "42%" }}
        />
        <button type="button" onClick={enterCategory}>
          Submit
        </button>
        <p>{submitMessage}</p>
      </div>
    </>
  );
};

const renderBudget = (month: number = 1) => {
  const [budgets, setBudgets] = useState<any[]>([]);

  useEffect(() => {
    const fetchBudgets = () => {
      fetch("/api/getBudgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ month }),
      })
        .then((response) => response.json())
        .then((data) => {
          setBudgets(data.budget);
        })
        .catch((error) => {
          console.error("Error fetching budget data:", error);
        });
    };

    // Fetch transactions initially
    const fetchData = async () => {
      const data = await fetchBudgets();
      console.log("Data:", data);
      // setBudgets(data.month);
    };
    fetchData();

    // Set up polling to refresh transactions every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th style={{ padding: "8px", textAlign: "left" }}> Category</th>
          <th style={{ padding: "8px", textAlign: "left" }}> Limit</th>
        </tr>
      </thead>
      <tbody>
        {budgets.map((category, index) => (
          <tr key={index}>
            <td>{category.category}</td>
            <td>{category.category_limit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const renderTable = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<any[]>([]);
  const [categorySums, setCategorySums] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCategories();
      setCategories(data.category);

      const sums: { [key: string]: number } = {};
      for (const category of data.category) {
        const sum = await categorySum(category.category);
        console.log("Getting sum for category:", category, "Sum:", sum);
        sums[category.category] = sum !== null ? sum : 0;
      }
      setCategorySums(sums);
    };
    fetchData();

    // const intervalId = setInterval(fetchData, 5000);

    // return () => clearInterval(intervalId);
    return () => {};
  }, []);

  // Function to toggle category selection
  const toggleSelect = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Function to delete selected categories
  const deleteSelectedCategories = async () => {
    try {
      for (const category of selectedCategories) {
        await fetch("/api/deleteCategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category }),
        });
      }
      // Refresh the table data after deletion
      const updatedData = await fetchCategories();
      setCategories(updatedData.category);
      // Clear selected categories after deletion
      setSelectedCategories(new Set());
    } catch (error) {
      console.error("Error deleting categories:", error);
    }
  };

  return (
    <>
      <table className="table-container">
        <thead>
          <tr>
            <th style={{ padding: "8px", textAlign: "left" }}>Category</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Limit</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Remaining</th>
            <th style={{ padding: "8px", textAlign: "center" }}>Select</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td>{category.category}</td>
              <td>{category.category_limit}</td>
              <td>
                {category.category_limit -
                  (categorySums[category.category] || 0) <
                0
                  ? `Exceeded by ${Math.abs(
                      category.category_limit -
                        (categorySums[category.category] || 0)
                    ).toFixed(2)}`
                  : (
                      category.category_limit -
                      (categorySums[category.category] || 0)
                    ).toFixed(2)}
              </td>
              <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(category.category)}
                    // Handle checkbox toggle
                    onChange={() => toggleSelect(category.category)}
                  />
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={deleteSelectedCategories}
        disabled={selectedCategories.size === 0} // Disable if no category is selected
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: selectedCategories.size === 0 ? "#ccc" : "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: selectedCategories.size === 0 ? "not-allowed" : "pointer",
        }}
      >
        Delete Selected
      </button>
    </>
  );
};

export default function Budgets() {
  const [categoryDataArray, setCategoryData] = useState(new Map());
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCategories(); // Await the async function
        setCategoryData(result); // Set the state with the Map
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData(); // Call the async function
  }, []);

  return (
    <>
      <title>Budgets</title>
      {header}
      <article id="main" className="content">
        <h2>Current month</h2>

        {renderTable()}

        <CategoryInput />
      </article>
      {footer}
    </>
  );
}
