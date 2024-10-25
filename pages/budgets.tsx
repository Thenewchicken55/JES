import React, { use, useState, useEffect } from "react";
import { header, footer } from "../app/globals.tsx";
import "@/app/globals.css";
import { useTheme } from "next-themes";
import "@/pages/table.css"; // Import the dark mode CSS

const pageTitle = (
  <>
    <title>Budgets</title>
  </>
);

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

  // Event handlers
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryAmount(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  // Log to web console
  const handleSubmit = () => {
    console.log("Category Amount:", categoryAmount);
    console.log("Category Name:", categoryName);

    // API calls to add category can be made here
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
        />
        <input
          className="inputBudget"
          name="categoryName"
          placeholder="Enter category name"
          value={categoryName}
          onChange={handleNameChange}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

const renderTable = () => {
  const [budgets, setBudgets] = useState<any[]>([]);


  useEffect(() =>  {
    // Fetch transactions initially
    const fetchData = async () => {
      const data = await fetchCategories();
      setBudgets(data.category);
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

export default function Budgets() {
  const [categoryDataArray, setCategoryData] = useState(new Map());
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCategories(); // Await the async function
        console.log("Fetched Data:", result); // Log the fetched result
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
      {pageTitle}
      {header}
      {/* do 'npm install -g react-devtools'
      this allows for better debugging using react-devtools
      download extension https://react.dev/learn/react-developer-tools*/}
      <script src="http://localhost:8097"></script>
      <article id="main" className="content">
        <h2>Current month</h2>
        {/* <button>Update</button> */}
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

// export default function About() {
//     const [showTable, setShowTable] = useState(false);
//     const showTableHandler = () => {
//       setShowTable(true);
//     };

//     return (
//         <>
//             {pageTitle}
//             {header}
//             <article id="main" className="content">
//                 <h2>Current month</h2>
//                 <button onClick={showTableHandler}>Show/Update</button>
//                 {showTable && renderTable()}

//                 <CategoryInput />

//                 <h2>Logged Budgets</h2>
//                 <div className = "button-container">
//                     <button>Budget 2</button>
//                     <button>Budget 3</button>
//                 </div>
//             </article>

//             {footer}
//         </>
//     );
