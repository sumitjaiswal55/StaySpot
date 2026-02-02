import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./api/axios";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorAlert from "./pages/listings/ErrorAlert"; // Aapke structure ke hisaab se path

// Pages - Listings (Path check kar lena: ./pages/listings/...)
import AllListings from "./pages/listings/AllListings";
import Show from "./pages/listings/Show";
import NewListing from "./pages/listings/NewListing";
import EditListing from "./pages/listings/EditListing";
import NotFound from "./pages/listings/NotFound";

// Pages - Users (Path check kar lena: ./pages/users/...)
import Signup from "./pages/users/Signup";
import Login from "./pages/users/Login";

function App() {
  const [listings, setListings] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await API.get("/listings");
        setListings(res.data);
      } catch (err) {
        setErrorMsg("Failed to load listings. Please check backend.");
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="container flex-grow-1 mt-4">
          {/* Agar koi global error ho toh yahan dikhega */}
          <ErrorAlert message={errorMsg} />

          <Routes>
            {/* 1. All Listings (Home) */}
            <Route path="/" element={<AllListings listings={listings} />} />
            <Route path="/listings" element={<AllListings listings={listings} />} />

            {/* 2. Create New Listing (Iska path /listings/new rakha hai) */}
            <Route path="/listings/new" element={<NewListing />} />

            {/* 3. Show Single Listing (ID dynamic hai) */}
            <Route path="/listings/:id" element={<Show />} />

            {/* 4. Edit Listing */}
            <Route path="/listings/:id/edit" element={<EditListing />} />

            {/* 5. User Auth */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* 6. 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;