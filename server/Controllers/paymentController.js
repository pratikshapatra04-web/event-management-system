// // server/Controllers/paymentController.js
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import Booking from "../models/Booking.js";
// import mongoose from "mongoose";

// dotenv.config();

// export const createOrder = async (req, res) => {
//   try {
//     const { bookingId } = req.body;
//     const isDbConnected = mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(bookingId);

//     if (!isDbConnected) {
//       console.log("⚠️ MongoDB is offline. Creating mock Razorpay order.");
//       global.mockBookings = global.mockBookings || [];
//       const booking = global.mockBookings.find(b => b._id.toString() === bookingId.toString());
      
//       if (!booking) {
//         return res.status(404).json({ success: false, message: "Booking not found in Demo Mode" });
//       }

//       // Generate a valid-looking mock Razorpay order payload
//       const mockOrderId = "order_mock_" + Math.random().toString(36).substring(2, 15);
//       const orderPayload = {
//         id: mockOrderId,
//         entity: "order",
//         amount: booking.totalAmount * 100, // in paise
//         amount_paid: 0,
//         amount_due: booking.totalAmount * 100,
//         currency: "INR",
//         receipt: `booking_${booking._id}`,
//         status: "created",
//         attempts: 0,
//         notes: {
//           bookingId: booking._id,
//           eventName: booking.eventName
//         },
//         created_at: Math.floor(Date.now() / 1000)
//       };

//       // Save order details to the mock booking
//       booking.paymentMode = "Razorpay";
//       booking.razorpayOrderId = mockOrderId;

//       return res.status(201).json({
//         success: true,
//         message: "Order created successfully (Offline Demo Mode)",
//         data: orderPayload
//       });
//     }

//     // Standard MongoDB + Razorpay Flow
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       // Fallback: If MongoDB is connected but Razorpay credentials are missing, we still want to make it testable!
//       console.warn("⚠️ Razorpay credentials missing. Generating testing order.");
//       const booking = await Booking.findById(bookingId);
//       if (!booking) {
//         return res.status(404).json({ success: false, message: "Booking not found" });
//       }
      
//       const mockOrderId = "order_mock_" + Math.random().toString(36).substring(2, 15);
//       booking.paymentMode = "Razorpay";
//       booking.razorpayOrderId = mockOrderId;
//       await booking.save();

//       return res.status(201).json({
//         success: true,
//         message: "Order created for testing (Missing keys)",
//         data: {
//           id: mockOrderId,
//           amount: booking.totalAmount * 100,
//           currency: "INR"
//         }
//       });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     const options = {
//       amount: booking.totalAmount * 100,
//       currency: "INR",
//       receipt: `booking_${booking._id}`,
//       notes: {
//         bookingId: booking._id.toString(),
//         eventName: booking.eventName,
//       },
//     };

//     const order = await razorpay.orders.create(options);

//     booking.paymentMode = "Razorpay";
//     booking.razorpayOrderId = order.id;
//     await booking.save();

//     return res.status(201).json({
//       success: true,
//       message: "Order created",
//       data: order,
//     });

//   } catch (err) {
//     console.error("createOrder error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Failed to create Razorpay order",
//     });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       bookingId,
//     } = req.body;

//     const isDbConnected = mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(bookingId);

//     if (!isDbConnected) {
//       console.log("⚠️ MongoDB is offline. Verifying payment mock-signature.");
//       global.mockBookings = global.mockBookings || [];
//       const booking = global.mockBookings.find(b => b._id.toString() === bookingId.toString());
      
//       if (!booking) {
//         return res.status(404).json({ success: false, message: "Booking not found in Demo Mode" });
//       }

//       // Automatically accept checkout
//       booking.paymentStatus = "paid";
//       booking.status = "confirmed";
//       booking.transactionId = razorpay_payment_id || "pay_mock_" + Math.random().toString(36).substring(2, 10);
//       booking.razorpayPaymentId = booking.transactionId;
//       booking.razorpaySignature = razorpay_signature || "sig_mock_" + Math.random().toString(36).substring(2, 10);

//       return res.status(200).json({
//         success: true,
//         message: "Payment successfully verified via Demo Mode!",
//         data: booking,
//       });
//     }

//     // Standard MongoDB Flow
//     // If it's a mock order id (no keys configured), verify mock signatures instantly
//     if ((razorpay_order_id && razorpay_order_id.startsWith("order_mock_")) || (razorpay_signature && razorpay_signature.startsWith("sig_test_"))) {
//       const booking = await Booking.findById(bookingId);
//       if (!booking) {
//         return res.status(404).json({ success: false, message: "Booking not found" });
//       }

//       booking.paymentStatus = "paid";
//       booking.status = "confirmed";
//       booking.transactionId = razorpay_payment_id || "pay_mock_" + Math.random().toString(36).substring(2, 10);
//       booking.razorpayPaymentId = booking.transactionId;
//       booking.razorpaySignature = razorpay_signature || "sig_mock_" + Math.random().toString(36).substring(2, 10);
//       await booking.save();

//       return res.status(200).json({
//         success: true,
//         message: "Payment verified successfully (Mock Signature Mode)",
//         data: booking
//       });
//     }

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     if (expectedSign !== razorpay_signature) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid payment signature" });
//     }

//     const booking = await Booking.findById(bookingId);
//     if (!booking) {
//       return res.status(404).json({ success: false, message: "Booking not found" });
//     }

//     booking.paymentStatus = "paid";
//     booking.status = "confirmed";
//     booking.transactionId = razorpay_payment_id;
//     booking.razorpayPaymentId = razorpay_payment_id;
//     booking.razorpaySignature = razorpay_signature;
//     await booking.save();

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified & booking updated",
//       data: booking,
//     });

//   } catch (err) {
//     console.error("verifyPayment error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message || "Failed to verify payment",
//     });
//   }
// };


// server/Controllers/paymentController.
// server/Controllers/paymentController.js

import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Booking from "../models/Booking.js";

dotenv.config();

// =====================================================
// CREATE RAZORPAY ORDER
// =====================================================

export const createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // -----------------------------------------------
    // Check bookingId
    // -----------------------------------------------

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    // -----------------------------------------------
    // Check Razorpay credentials
    // -----------------------------------------------

    if (
      !process.env.RAZORPAY_KEY_ID ||
      !process.env.RAZORPAY_KEY_SECRET
    ) {
      console.error("❌ Razorpay credentials are missing");

      return res.status(500).json({
        success: false,
        message: "Razorpay credentials are not configured",
      });
    }

    // -----------------------------------------------
    // Find booking
    // -----------------------------------------------

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // -----------------------------------------------
    // Check amount
    // -----------------------------------------------

    const amount = Number(booking.totalAmount);

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking amount",
      });
    }

    // -----------------------------------------------
    // Razorpay amount is in paise
    // ₹950 = 95000 paise
    // -----------------------------------------------

    const razorpayAmount = Math.round(amount * 100);

    // -----------------------------------------------
    // Razorpay instance
    // -----------------------------------------------

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // -----------------------------------------------
    // Razorpay order options
    // -----------------------------------------------

    const options = {
      amount: razorpayAmount,
      currency: "INR",
      receipt: `booking_${booking._id}`,
      notes: {
        bookingId: booking._id.toString(),
        eventName: booking.eventName || "Event Booking",
      },
    };

    console.log("=================================");
    console.log("Creating Razorpay Test Order");
    console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Amount:", razorpayAmount);
    console.log("Currency:", "INR");
    console.log("=================================");

    // -----------------------------------------------
    // Create Razorpay order
    // -----------------------------------------------

    const order = await razorpay.orders.create(options);

    // -----------------------------------------------
    // Save Razorpay order ID in booking
    // -----------------------------------------------

    booking.paymentMode = "Razorpay";
    booking.razorpayOrderId = order.id;

    await booking.save();

    // -----------------------------------------------
    // Debug log
    // NEVER print secret key
    // -----------------------------------------------

    console.log("=================================");
    console.log("✅ RAZORPAY ORDER CREATED");
    console.log("Order ID:", order.id);
    console.log("Amount:", order.amount);
    console.log("Currency:", order.currency);
    console.log("=================================");

    return res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",

      data: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    });
  } catch (error) {
    console.error("❌ createOrder error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error?.error?.description ||
        error?.message ||
        "Failed to create Razorpay order",
    });
  }
};

// =====================================================
// VERIFY RAZORPAY PAYMENT
// =====================================================

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
    } = req.body;

    // -----------------------------------------------
    // Check required fields
    // -----------------------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !bookingId
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification data is incomplete",
      });
    }

    // -----------------------------------------------
    // Validate booking ID
    // -----------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    // -----------------------------------------------
    // Check Razorpay secret
    // -----------------------------------------------

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ Razorpay secret key is missing");

      return res.status(500).json({
        success: false,
        message: "Razorpay secret key is not configured",
      });
    }

    // -----------------------------------------------
    // Generate signature
    //
    // Razorpay signature:
    //
    // order_id + "|" + payment_id
    // -----------------------------------------------

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // -----------------------------------------------
    // Compare signature
    // -----------------------------------------------

    if (generatedSignature !== razorpay_signature) {
      console.error(
        "❌ Razorpay signature verification failed"
      );

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // -----------------------------------------------
    // Find booking
    // -----------------------------------------------

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // -----------------------------------------------
    // Check Razorpay order belongs to booking
    // -----------------------------------------------

    if (
      booking.razorpayOrderId &&
      booking.razorpayOrderId !== razorpay_order_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment order does not match this booking",
      });
    }

    // -----------------------------------------------
    // Payment successful
    // -----------------------------------------------

    booking.paymentMode = "Razorpay";
    booking.paymentStatus = "paid";
    booking.status = "confirmed";

    booking.transactionId = razorpay_payment_id;
    booking.razorpayPaymentId = razorpay_payment_id;
    booking.razorpaySignature = razorpay_signature;
    booking.razorpayOrderId = razorpay_order_id;

    await booking.save();

    // -----------------------------------------------
    // Success log
    // -----------------------------------------------

    console.log("=================================");
    console.log("✅ RAZORPAY PAYMENT VERIFIED");
    console.log("Order ID:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);
    console.log("Booking ID:", bookingId);
    console.log("=================================");

    // -----------------------------------------------
    // Send response
    // -----------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",

      data: {
        bookingId: booking._id,
        paymentStatus: booking.paymentStatus,
        paymentMode: booking.paymentMode,
        status: booking.status,
        transactionId: booking.transactionId,
        razorpayOrderId: booking.razorpayOrderId,
        razorpayPaymentId: booking.razorpayPaymentId,
      },
    });
  } catch (error) {
    console.error("❌ verifyPayment error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to verify Razorpay payment",
    });
  }
};
