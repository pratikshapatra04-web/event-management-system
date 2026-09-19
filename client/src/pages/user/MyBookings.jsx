

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "../../styles/user-dashboard.css";
// import "../../styles/admin-tables.css";

// const BACKEND_URL =
//   process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${BACKEND_URL}/api/v1/booking/my-bookings`,
//         { withCredentials: true }
//       );
//       setBookings(res.data.data || []);
//     } catch (error) {
//       console.error("MyBookings error:", error);
//       setErr(
//         error.response?.data?.message ||
//           "Failed to load bookings. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const loadRazorpay = () =>
//     new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const handlePayNow = async (booking) => {
//     try {
//       // 1) Create order on backend
//       const orderRes = await axios.post(
//         `${BACKEND_URL}/api/v1/payments/create-order`,
//         { bookingId: booking._id },
//         { withCredentials: true }
//       );

//       const order = orderRes.data.data;

//       // 🛑 OFFLINE MOCK BYPASS: If Razorpay API Key is not configured, complete payment programmatically!
//       const rzpKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
//       if (!rzpKey || rzpKey === "undefined" || rzpKey.trim() === "" || order.id.startsWith("order_mock_")) {
//         console.log("⚠️ Razorpay API key is missing or we are in Demo Mode. Simulating instant mock payment checkout.");
        
//         Swal.fire({
//           title: "Offline Payment Simulation",
//           text: "Razorpay Key ID is not configured in .env. We will simulate a successful mock checkout instantly for you!",
//           icon: "info",
//           showCancelButton: true,
//           confirmButtonColor: "#34d399",
//           cancelButtonColor: "#6c757d",
//           confirmButtonText: "Execute Mock Payment",
//           cancelButtonText: "Cancel Checkout"
//         }).then(async (choice) => {
//           if (choice.isConfirmed) {
//             try {
//               Swal.fire({
//                 title: "Processing...",
//                 text: "Verifying mock payment hashes...",
//                 allowOutsideClick: false,
//                 didOpen: () => {
//                   Swal.showLoading();
//                 }
//               });

//               await axios.post(
//                 `${BACKEND_URL}/api/v1/payments/verify`,
//                 {
//                   razorpay_order_id: order.id,
//                   razorpay_payment_id: "pay_mock_" + Math.random().toString(36).substring(2, 10),
//                   razorpay_signature: "sig_mock_" + Math.random().toString(36).substring(2, 10),
//                   bookingId: booking._id,
//                 },
//                 { withCredentials: true }
//               );

//               Swal.fire({
//                 icon: "success",
//                 title: "Payment Successful!",
//                 text: "Your booking is now fully paid and confirmed.",
//                 confirmButtonColor: "#10b981"
//               });

//               fetchBookings(); // refresh table
//             } catch (err) {
//               console.error("Mock verification failed:", err);
//               Swal.fire({
//                 icon: "error",
//                 title: "Payment Error",
//                 text: "Mock payment verification failed.",
//                 confirmButtonColor: "#ef4444"
//               });
//             }
//           }
//         });
//         return;
//       }

//       const loaded = await loadRazorpay();
//       if (!loaded) {
//         alert("Razorpay SDK failed to load. Check your connection.");
//         return;
//       }

//       const options = {
//         key: rzpKey,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Event Management",
//         description: booking.eventName,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(
//               `${BACKEND_URL}/api/v1/payments/verify`,
//               {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 bookingId: booking._id,
//               },
//               { withCredentials: true }
//             );
//             Swal.fire({
//               icon: "success",
//               title: "Payment Successful!",
//               text: "Your payment has been successfully captured and verified.",
//               confirmButtonColor: "#10b981"
//             });
//             fetchBookings(); // refresh table
//           } catch (err) {
//             console.error("Payment verification failed:", err);
//             Swal.fire({
//               icon: "error",
//               title: "Verification Failed",
//               text: "Payment captured but signature verification failed.",
//               confirmButtonColor: "#ef4444"
//             });
//           }
//         },
//         modal: {
//           ondismiss: function () {
//             // Restore scroll lock if any
//             document.body.style.overflow = "unset";
//             document.documentElement.style.overflow = "unset";
//           }
//         },
//         prefill: {
//           name: booking.user?.username || "",
//           email: booking.user?.email || "",
//         },
//         theme: {
//           color: "#e63946",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("handlePayNow error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Initiate Failed",
//         text: error.response?.data?.message || "Unable to initiate payment. Try again later.",
//         confirmButtonColor: "#ef4444"
//       });
//       // Force unlock scroll on error
//       document.body.style.overflow = "unset";
//       document.documentElement.style.overflow = "unset";
//     } finally {
//       // Release scroll locking automatically
//       document.body.style.overflow = "unset";
//       document.documentElement.style.overflow = "unset";
//     }
//   };

//   return (
//     <section className="user-page">
//       <div className="admin-card">
//         <h2>My Bookings</h2>
//         <p className="subtitle">
//           All event & product bookings you have created in the system.
//         </p>

//         {loading && <p className="info-text">Loading bookings...</p>}
//         {err && !loading && <p className="info-text error">{err}</p>}

//         {!loading && !err && bookings.length === 0 && (
//           <p className="info-text">
//             You don't have any bookings yet. Go to Events or Buy Products and
//             create one.
//           </p>
//         )}

//         {!loading && !err && bookings.length > 0 && (
//           <>
//             <div className="dashboard-grid" style={{ marginBottom: "1.2rem" }}>
//               <div className="stat-card">
//                 <span className="stat-label">Total Bookings</span>
//                 <span className="stat-value">{bookings.length}</span>
//               </div>
//               <div className="stat-card">
//                 <span className="stat-label">Confirmed</span>
//                 <span className="stat-value">
//                   {bookings.filter((b) => b.status === "confirmed").length}
//                 </span>
//               </div>
//               <div className="stat-card">
//                 <span className="stat-label">Pending</span>
//                 <span className="stat-value">
//                   {bookings.filter((b) => b.status === "pending").length}
//                 </span>
//               </div>
//             </div>

//             <div className="table-wrap">
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Event</th>
//                     <th>Venue</th>
//                     <th>Date</th>
//                     <th>Guests</th>
//                     <th>Amount (₹)</th>
//                     <th>Status</th>
//                     <th>Payment</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bookings.map((b) => (
//                     <tr key={b._id}>
//                       <td>{b.eventName}</td>
//                       <td>{b.venueName}</td>
//                       <td>{new Date(b.date).toLocaleDateString()}</td>
//                       <td>{b.guests}</td>
//                       <td>{b.totalAmount}</td>
//                       <td>
//                         <span className={`status-pill ${b.status}`}>
//                           {b.status}
//                         </span>
//                       </td>
//                       <td>{b.paymentStatus}</td>
//                       <td>
//                         {b.paymentStatus !== "paid" && (
//                           <button
//                             className="btn primary__btn btn-sm"
//                             onClick={() => handlePayNow(b)}
//                           >
//                             Pay Now
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default MyBook
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/user-dashboard.css";
import "../../styles/admin-tables.css";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ==========================================
  // FETCH BOOKINGS
  // ==========================================

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BACKEND_URL}/api/v1/booking/my-bookings`,
        {
          withCredentials: true,
        }
      );

      setBookings(res.data?.data || []);
    } catch (error) {
      console.error("❌ MyBookings error:", error);

      setErr(
        error.response?.data?.message ||
          "Failed to load bookings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ==========================================
  // LOAD RAZORPAY SDK
  // ==========================================

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      // Already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      );

      // Script already exists but has not finished loading
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true));
        existingScript.addEventListener("error", () => resolve(false));
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.async = true;

      script.onload = () => {
        console.log("✅ Razorpay SDK loaded");
        resolve(true);
      };

      script.onerror = () => {
        console.error("❌ Razorpay SDK failed to load");
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // ==========================================
  // PAY NOW
  // ==========================================

  const handlePayNow = async (booking) => {
    try {
      console.log("=================================");
      console.log("🚀 STARTING RAZORPAY PAYMENT");
      console.log("Booking ID:", booking?._id);
      console.log("Booking Amount:", booking?.totalAmount);
      console.log("=================================");

      // ======================================
      // 1. GET FRONTEND RAZORPAY TEST KEY
      // ======================================

      let rzpKey =
        process.env.REACT_APP_RAZORPAY_KEY_ID;

      if (rzpKey) {
        rzpKey = rzpKey
          .trim()
          .replace(/^["']|["']$/g, "");
      }

      console.log(
        "🔑 FRONTEND RAZORPAY KEY:",
        rzpKey
      );

      // ======================================
      // VALIDATE KEY
      // ======================================

      if (!rzpKey) {
        Swal.fire({
          icon: "error",
          title: "Razorpay Key Missing",
          text:
            "REACT_APP_RAZORPAY_KEY_ID is missing from the frontend .env file.",
          confirmButtonColor: "#ef4444",
        });

        return;
      }

      if (!rzpKey.startsWith("rzp_test_")) {
        Swal.fire({
          icon: "error",
          title: "Invalid Test Key",
          text:
            "The frontend Razorpay key must start with rzp_test_.",
          confirmButtonColor: "#ef4444",
        });

        return;
      }

      // ======================================
      // 2. CREATE ORDER FROM BACKEND
      // ======================================

      console.log("🔄 Creating Razorpay order...");

      const orderRes = await axios.post(
        `${BACKEND_URL}/api/v1/payments/create-order`,
        {
          bookingId: booking._id,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "✅ Backend Order Response:",
        orderRes.data
      );

      const order = orderRes.data?.data;

      // ======================================
      // 3. VALIDATE ORDER
      // ======================================

      if (!order) {
        throw new Error(
          "Backend did not return a Razorpay order."
        );
      }

      if (!order.id) {
        throw new Error(
          "Razorpay Order ID is missing."
        );
      }

      if (!order.amount) {
        throw new Error(
          "Razorpay Order Amount is missing."
        );
      }

      if (!order.currency) {
        throw new Error(
          "Razorpay Order Currency is missing."
        );
      }

      console.log("=================================");
      console.log("✅ RAZORPAY ORDER CREATED");
      console.log("Order ID:", order.id);
      console.log("Amount:", order.amount);
      console.log("Currency:", order.currency);
      console.log("Frontend Key:", rzpKey);
      console.log("=================================");

      // ======================================
      // 4. LOAD RAZORPAY CHECKOUT SDK
      // ======================================

      const loaded = await loadRazorpay();

      if (!loaded || !window.Razorpay) {
        Swal.fire({
          icon: "error",
          title: "Razorpay SDK Error",
          text:
            "Razorpay Checkout could not be loaded. Please refresh the page and try again.",
          confirmButtonColor: "#ef4444",
        });

        return;
      }

      console.log("✅ Razorpay SDK is ready");

      // ======================================
      // 5. CHECK AMOUNT
      // ======================================

      const amount = Number(order.amount);

      if (!Number.isInteger(amount) || amount <= 0) {
        throw new Error(
          "Invalid Razorpay amount received from backend."
        );
      }

      // ======================================
      // 6. RAZORPAY CHECKOUT OPTIONS
      // ======================================

      const options = {
        key: rzpKey,

        amount: amount,

        currency: String(order.currency).toUpperCase(),

        name: "EVENZA",

        description:
          booking.eventName || "Event Booking",

        order_id: order.id,

        handler: async function (response) {
          try {
            console.log("=================================");
            console.log(
              "✅ RAZORPAY PAYMENT SUCCESS RESPONSE"
            );
            console.log(response);
            console.log("=================================");

            // ==================================
            // VERIFY PAYMENT ON SERVER
            // ==================================

            const verifyRes = await axios.post(
              `${BACKEND_URL}/api/v1/payments/verify`,
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                bookingId: booking._id,
              },
              {
                withCredentials: true,
              }
            );

            console.log(
              "✅ Payment Verification Response:",
              verifyRes.data
            );

            // ==================================
            // PAYMENT VERIFIED
            // ==================================

            if (verifyRes.data?.success) {
              await Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                text:
                  "Your payment has been successfully verified and your booking is confirmed.",
                confirmButtonColor: "#10b981",
              });

              fetchBookings();
            } else {
              throw new Error(
                verifyRes.data?.message ||
                  "Payment verification failed."
              );
            }
          } catch (error) {
            console.error(
              "❌ Payment verification failed:",
              error
            );

            Swal.fire({
              icon: "error",
              title: "Verification Failed",
              text:
                error.response?.data?.message ||
                error.message ||
                "Payment was completed but verification failed.",
              confirmButtonColor: "#ef4444",
            });
          }
        },

        // ======================================
        // CUSTOMER DETAILS
        // ======================================

        prefill: {
          name:
            booking.user?.username ||
            booking.username ||
            "",

          email:
            booking.user?.email ||
            booking.email ||
            "",
        },

        // ======================================
        // THEME
        // ======================================

        theme: {
          color: "#e63946",
        },

        // ======================================
        // MODAL
        // ======================================

        modal: {
          ondismiss: function () {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow =
              "unset";

            console.log(
              "ℹ️ Razorpay Checkout closed."
            );
          },
        },

        // ======================================
        // RETRY
        // ======================================

        retry: {
          enabled: true,
          max_count: 2,
        },
      };

      // ======================================
      // 7. LOG FINAL CHECKOUT DATA
      // ======================================

      console.log("=================================");
      console.log("🔍 RAZORPAY CHECKOUT DATA");
      console.log("Key:", options.key);
      console.log("Amount:", options.amount);
      console.log("Currency:", options.currency);
      console.log("Order ID:", options.order_id);
      console.log("=================================");

      // ======================================
      // 8. CREATE RAZORPAY INSTANCE
      // ======================================

      const razorpay = new window.Razorpay(
        options
      );

      // ======================================
      // 9. PAYMENT FAILED
      // ======================================

      razorpay.on(
        "payment.failed",
        function (response) {
          const error =
            response?.error || {};

          console.error(
            "================================="
          );

          console.error(
            "❌ RAZORPAY PAYMENT FAILED"
          );

          console.error(
            "Code:",
            error.code
          );

          console.error(
            "Description:",
            error.description
          );

          console.error(
            "Source:",
            error.source
          );

          console.error(
            "Step:",
            error.step
          );

          console.error(
            "Reason:",
            error.reason
          );

          console.error(
            "Metadata:",
            error.metadata
          );

          console.error(
            "================================="
          );

          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text:
              error.description ||
              "Razorpay payment could not be completed.",
            confirmButtonColor: "#ef4444",
          });
        }
      );

      // ======================================
      // 10. OPEN CHECKOUT
      // ======================================

      console.log(
        "🚀 Opening Razorpay Checkout..."
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "❌ handlePayNow error:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Payment Initiation Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to initiate payment. Please try again.",
        confirmButtonColor: "#ef4444",
      });

      document.body.style.overflow = "unset";
      document.documentElement.style.overflow =
        "unset";
    }
  };

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <section className="user-page">
      <div className="admin-card">
        <h2>My Bookings</h2>

        <p className="subtitle">
          All event & product bookings you have
          created in the system.
        </p>

        {loading && (
          <p className="info-text">
            Loading bookings...
          </p>
        )}

        {err && !loading && (
          <p className="info-text error">
            {err}
          </p>
        )}

        {!loading &&
          !err &&
          bookings.length === 0 && (
            <p className="info-text">
              You don't have any bookings yet.
              Go to Events or Buy Products and
              create one.
            </p>
          )}

        {!loading &&
          !err &&
          bookings.length > 0 && (
            <>
              {/* ==================================
                  DASHBOARD STATS
              ================================== */}

              <div
                className="dashboard-grid"
                style={{
                  marginBottom: "1.2rem",
                }}
              >
                <div className="stat-card">
                  <span className="stat-label">
                    Total Bookings
                  </span>

                  <span className="stat-value">
                    {bookings.length}
                  </span>
                </div>

                <div className="stat-card">
                  <span className="stat-label">
                    Confirmed
                  </span>

                  <span className="stat-value">
                    {
                      bookings.filter(
                        (b) =>
                          b.status ===
                          "confirmed"
                      ).length
                    }
                  </span>
                </div>

                <div className="stat-card">
                  <span className="stat-label">
                    Pending
                  </span>

                  <span className="stat-value">
                    {
                      bookings.filter(
                        (b) =>
                          b.status ===
                          "pending"
                      ).length
                    }
                  </span>
                </div>
              </div>

              {/* ==================================
                  BOOKINGS TABLE
              ================================== */}

              <div className="table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Guests</th>
                      <th>Amount (₹)</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id}>
                        <td>
                          {b.eventName}
                        </td>

                        <td>
                          {b.venueName}
                        </td>

                        <td>
                          {new Date(
                            b.date
                          ).toLocaleDateString()}
                        </td>

                        <td>
                          {b.guests}
                        </td>

                        <td>
                          {b.totalAmount}
                        </td>

                        <td>
                          <span
                            className={`status-pill ${b.status}`}
                          >
                            {b.status}
                          </span>
                        </td>

                        <td>
                          {b.paymentStatus}
                        </td>

                        <td>
                          {b.paymentStatus !==
                            "paid" && (
                            <button
                              className="btn primary__btn btn-sm"
                              onClick={() =>
                                handlePayNow(b)
                              }
                            >
                              Pay Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
      </div>
    </section>
  );
};

export default MyBookings;


