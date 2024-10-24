import React, { use, useState, useEffect } from "react";
import { header, footer } from "../app/globals.tsx";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import "../app/globals.css";

const pageTitle = (
  <>
    <title>Budgets</title>
  </>
);

interface Category {
  category: string;
  category_limit: number;
}
interface CategoryData {
  message: string;
  category: Category[];
}

const fetchCategoryData = async () => {
  const response = await fetch("/api/getCategory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ${token}",
    },
    //   body: JSON.stringify(),
    //   body: JSON.stringify(body),
    // body: body ? JSON.stringify(body) : null, // Convert body to JSON if it exists
  });

  if (response.ok) {
    const data: CategoryData = await response.json();
    console.log("Category Data:", data);
    const message = data.message;
    let categoryName: string | undefined; // Declare outside for scope
    let categoryLimit: number | undefined;
    let tuple = new Map();
    let tuples: Array<Map<string, string | number>> = [];
    data.category.forEach((categoryItem) => {
      categoryName = categoryItem.category;
      categoryLimit = categoryItem.category_limit;
      console.log(`Category: ${categoryName}`);
      console.log(`Category Limit: ${categoryLimit}`);
      tuple.set("name", categoryName);
      tuple.set("limit", categoryLimit);
      tuples.push(tuple);
    });
    return tuples;
    // result.get('name');
    // result.get('limit');
    //   return data;
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
  return (
    <>
      <table>
        {/* Add table content here */}
      </table>
    </>
  );
};

export default function About() {
  const [categoryDataArray, setCategoryData] = useState(new Map());
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchCategoryData(); // Await the async function
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
      <h2>Category Information</h2>
      <ul>
        {loading ? ( // Check loading state
          <li>Loading...</li>
        ) : categoryDataArray.length > 0 ? (
          categoryDataArray.map((categoryData, index) => (
            <li key={index}>
              {Array.from(categoryData).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </li>
          ))
        ) : (
          <li>No data found.</li> // Handle empty data
        )}
      </ul>
    </>
  );
  // return (
  //     <>
  //         <h2>Category Information</h2>
  //         <ul>
  //             {categoryDataArray.forEach(categoryData, index) => {
  //                 loading ? ( // Check loading state
  //                     <li>Loading...</li>
  //                 ) : (

  //                     Array.from(categoryData).length > 0 ? (
  //                         Array.from(categoryData).map(([key, value]) => (
  //                             <li key={key}>
  //                             <strong>{key}:</strong> {value}
  //                             </li>
  //                         ))
  //                     ) : (
  //                         <li>No data found.</li> // Handle empty data
  //                     )
  //                 )
  //             }}
  //         </ul>
  //     </>
  // );
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
