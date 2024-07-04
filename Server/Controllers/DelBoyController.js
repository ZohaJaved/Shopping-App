import Delivery from "../Model/DelBoyModel.js";
import Order from "../Model/OrderModel.js";

export const getOrderDetails = async (req, res) => {
    
    try {
        const orders = await Order.find();
        
      
       if (!orders || orders.length === 0) {
        return res.json({ message: 'No orders found' });
      }
      console.log("getOrderDetails",orders);
      return res.status(200).json({orders})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const fetchDeliveryOptions = async (req, res) => {
    console.log("fetchDeliveryOptions")
    const delBoysArray=[];
    try {
        const deliveryBoys = await Delivery.find();
        
      
       if (!deliveryBoys || deliveryBoys.length === 0) {
        return res.json({ message: 'No orders found' });
      }
      deliveryBoys.forEach(deliveryBoy=>{
        delBoysArray.push(deliveryBoy.name); // Pushing name to delBoysArray
      })
       
      console.log("delBoysArray",delBoysArray);
      return res.status(200).json({delBoysArray})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const getEmployeeDetails=async (req, res) => {
    console.log("getEmployeeDetails",req.query.email)
    const  email  = req.query.email;
        console.log("email",email)
    try {
        // Find the employee details containing the email given by the client
        const employee = await Delivery.findOne({ email });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        // Match the name of the employee with all the orders containing this name
        const orders = await Order.find({ delivery: employee.name });

        // Return the name of the delivery boy and the order details
        return res.status(200).json({ success: true, employeeName: employee.name, orders });
    } catch (error) {
        console.error("Error fetching employee details:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
