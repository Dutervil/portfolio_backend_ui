import { useEffect, useState } from "react";
import axios from "axios";

function useFetchData(apiEndpoint) {
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        // Only run fetch after the initial load (skip first render)
        const fetchData = async () => {
            try {
                setLoading(true); // Ensure loading state is set to true when starting
                const res = await axios.get(apiEndpoint);

                // If API response is expected to be an array
                if (Array.isArray(res.data)) {
                    setAllData(res.data); // Store fetched data
                } else {
                    setError("Data format is not as expected"); // Handle if it's not an array
                }

            } catch (error) {
                setError("Failed to fetch data"); // Handle the error
            } finally {
                setLoading(false); // Set loading to false once fetching is complete
            }
        };

        if (apiEndpoint) {
            fetchData(); // Fetch data when the apiEndpoint changes
        }
    }, [apiEndpoint]); // Only rerun when apiEndpoint changes

    return { allData, loading, error };
}

export default useFetchData;
