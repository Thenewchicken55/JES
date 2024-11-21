import React, { useState, useEffect } from "react";
import { header, footer } from "../app/globals.tsx";
import "@/app/globals.css";
import "@/pages/table.css";

const fetchCategories = async () => {
  const response = await fetch("/api/getCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Error fetching category data:", response.statusText);
  }
};

const CategoryInput = () => {
  // State for amount and name
  const [categoryAmount, setCategoryAmount] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const budget_id : number = 1;
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
    console.log("Category Amount:", categoryAmount);
    console.log("Category Name:", categoryName);

    // API calls to add category can be made here
    try {
      // Make the API request to the endpoint
      const response = await fetch("/api/createCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: categoryName, budget_id, category_limit: categoryAmount }),
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
          name="categoryAmount"
          placeholder="Enter category amount"
          value={categoryAmount}
          onChange={handleAmountChange}
          style={{ width: '42%' }}
          />
        <input
          className="inputBudget"
          name="categoryName"
          placeholder="Enter category name"
          value={categoryName}
          onChange={handleNameChange}
          style={{ width: '42%' }}
        />
        <button type="button" onClick={enterCategory}>
          Submit
        </button>
      <p>{submitMessage}</p>
      </div>
    </>
  );
};

const renderBudget = (month : number = 1) => {
  const [budgets, setBudgets] = useState<any[]>([]);

  useEffect(() =>  {
    const fetchBudgets = () =>
    {
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
    }

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
      <table className="table-container" >
        <thead>
          <tr>
          <th style={{ padding: '8px', textAlign: 'left'}}> Category</th>
          <th style={{padding: '8px', textAlign: 'left'}}> Limit</th>
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
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() =>  {
    // Fetch transactions initially
    const fetchData = async () => {
      const data = await fetchCategories();
      setCategories(data.category);
    };
    fetchData();

    // Set up polling to refresh transactions every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
      <table className="table-container" >
        <thead>
          <tr>
          <th style={{ padding: '8px', textAlign: 'left'}}> Category</th>
          <th style={{padding: '8px', textAlign: 'left'}}> Limit</th>
          </tr>
        </thead>
        <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.category}</td>
                  <td>{category.category_limit}</td>
                </tr>
              ))}
          </tbody>
      </table>
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
      {/* do 'npm install -g react-devtools'
      this allows for better debugging using react-devtools
      download extension https://react.dev/learn/react-developer-tools*/}
      <script src="http://localhost:8097"></script>
      <article id="main" className="content">
        <h2>Current month</h2>
        <>
          {/* {renderBudget()} */}
        </>
          {renderTable()}

        <CategoryInput />

        {/* <h2>Logged Budgets</h2> */}
        <div className="button-container">
          {/* <button>Budget 2</button>
          <button>Budget 3</button> */}
        </div>
      </article>

      {/* older months
      https://nextui.org/docs/components/accordion
      */}

      {footer}
    </>
  );
}
