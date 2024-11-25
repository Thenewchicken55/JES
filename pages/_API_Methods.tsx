// Abstraction layer from the API functionality to the pages

export const getCategoryTransactions = async (category: string) => {
    try {
        const response = await fetch("/api/getTransactionsFromCategory", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ category }), // Ensure the key matches the server-side handler
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Error fetching category transaction data:", response.statusText, "Category:", category);
            return null; // Return null or an empty array to handle the error case
        }
    } catch (error) {
        console.error("Error fetching category transaction data:", error, "Category:", category);
    return null; // Return null or an empty array to handle the error case
    }
};