
import React, { useState } from 'react';

function App() {
  const initialFormData = {
    firstname: "",
    lastname: "",
    mobilenumber: "",
    gender: "",
    carbrand: "",
    cartype: "",
    pricerange: "",
    acceptTerms: false,
  };


  const [formData, setFormData] = useState(initialFormData);
  const [savedId, setSavedId] = useState(null);
  const [data, setData] = useState({});


   const handleChange = (event) => {
    const {name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
  
  setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue
  }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
          const response = await fetch('http://localhost:5500/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error('Error saving form data');
          }
          const data = await response.json();
            setSavedId(data.id);
            console.log('Form data submitted:', data);
            setFormData(initialFormData);
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
      
    
      
      const handleViewClick = async () => {
    
        if(savedId) {
        try {
          const response = await fetch(`http://localhost:5500/data?id=${savedId}`);
            const fetchedData = await response.json();
            setData(fetchedData);
            console.log(Object.entries(fetchedData));
         } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      };



//   return (
//     <div>
//       <h1>Loan Application Form</h1>  
//       <form onSubmit={handleSubmit}>
//         <label>
//          First Name:
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
            
//           />
//         </label>
//         <br/>
        

//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//         </label>
//         <br/>
    

//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </label>
//         <br/>

//         <label>
//           Address:
//           <textarea
//             name = "address"
//             value={formData.address}
//             onChange={handleChange}
//             />
//         </label>
//         <br/>

//         <label>
//           Contact number:
//           <input
//           type="tel"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           />
//         </label>
//         <br/>

//         <label>
//           Gender :
//           <input
//           type="radio"
//           name="gender"
//           value="male"
//           onChange={handleChange}
//         />
//         Male
//       </label>
//       <label>
//         <input
//           type="radio"
//           name="gender"
//           value="female"
//           onChange={handleChange}
//         />
//         Female
//         </label>
//         <br/>
      
//         <label>
//           Loan Amount:
//           <input
//             type="number"
//             name="loanAmount"
//             value={formData.loanAmount}
//             onChange={handleChange}
//           />
//         </label>
//         <br/>

//         <label>
//           Loan Tenure:
//           <select
//             name="loanTenure"
//             value={formData.loanTenure}
//             onChange={handleChange}
//           >
//             <option value="5">5 years</option>
//             <option value="10">10 years</option>
//             <option value="15">15 years</option>
//           </select>
//         </label>
//         <br/>

//         <label>
//           <input
//           type="checkbox"
//           name="checkbox"
//           checked={formData.checkbox}
//           onChange={handleChange}
//           required
//           />
//           I confirm that all the information given above is True.
//         </label>
//         <br/>

//         <button type="submit">Submit</button>
//         {savedId && <p>Form Data: {savedId}</p>}
//         <button onClick={handleViewClick} disabled={!savedId} id="view">View Data</button>

//        {Object.entries(data).length> 0 && (
//        <div>
//         <h2>Fetched Data:</h2>

//         <ul>
//           {Object.entries(data).map(item => (
//             // <li key={item.id}>{item.fetchedData}</li>
//             <li key={item[0]}>{JSON.stringify(item, null, 2)}</li>
//           ))}
//         </ul>
//       </div>
//     )}
//       </form>
//       <div id="value"></div>
      
//     </div>
    
//   );
// }

return (
  <div>
    <h1>Pre Owned Car Enquiry Form</h1>
    <h2>Personal Details</h2>
    <form onSubmit={handleSubmit}>

      <div>
        <label>First Name :*</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div> <br/>

      <div>
        <label>Last Name :</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </div> <br/>

      <div>
        <label>Mobile Number :*</label>
        <input
          type="tel"
          name="mobilenumber"
          value={formData.mobilenumber}
          onChange={handleChange}
          required
        />
      </div> <br/>

        <div>
         <label>Gender :*</label> 
        </div>
      <div>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={formData.gender === "male"}
          onChange={handleChange}
          required
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === "female"}
          onChange={handleChange}
        />
        Female
        <input
          type="radio"
          name="gender"
          value="others"
          checked={formData.gender === "others"}
          onChange={handleChange}
        />
        Others
      </div> <br/>

      <h2>Car Details</h2>
      <div>
        <label>Car Brand :</label>
        <select
          name="carbrand"
          value={formData.carbrand}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="maruti">Maruti Suzuki</option>
          <option value="ford">Ford</option>
          <option value="nissan">Nissan</option>
          <option value="nissan">Benze</option>
          <option value="nissan">BMW</option>
          <option value="nissan">Tata</option>
          <option value="nissan">Others</option>
        </select>
      </div> <br/>

      <div>
        <label>Car Type :</label>
        <select
          name="cartype"
          value={formData.cartype}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="suv">Premium</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="hatchback">Hatchback</option>
        </select>
      </div> <br/>

      <div>
        <label>Price Range :</label>
        <select
          name="pricerange"
          value={formData.pricerange}
          onChange={handleChange}
        >
          <option value="">--Select--</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div> <br/>

      <div>
        <label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          I accept the terms & conditions
          <br></br><small>The provision of personal information to our website will remain voluntary. Such<br></br> 
          information wiil not be disclosed to third parties without your express consent</small>
        </label>
      </div> <br/>

      <button type="submit">Submit</button>
        {savedId && <p>Form Data: {savedId}</p>} <br></br>
        <button onClick={handleViewClick} id="view">View Data</button>

       {Object.entries(data).length> 0 && (
       <div>
        <h2>Fetched Data:</h2>

        <ul>
          {Object.entries(data).map(item => (
            // <li key={item.id}>{item.fetchedData}</li>
            <li key={item[0]}>{JSON.stringify(item, null, 2)}</li>
          ))}
        </ul>
      </div>
    )}
      </form>
      <div id="value"></div>
      
    </div>
    
  );
}


export default App;