import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const generatePDF = (billDetails) => {
  // Define document content
  const docDefinition = {
    content: [
      {
        text: 'Bill Details',
        style: 'header',
      },
      {
        text: `Supplier with ID: ${billDetails.supplier_id}\nBill Date: ${billDetails.billDate}`,
        margin: [0, 20],
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto'],
          body: [
            ['Milk Type', 'Fat', 'Quantity'],
            ['Cow', billDetails.cowMilkFat, billDetails.cowMilkQuantity],
            ['Buffalo', billDetails.buffaloMilkFat, billDetails.buffaloMilkQuantity],
            [{ text: 'Total Amount', bold: true }, '', billDetails.totalAmount],
          ],
        },
        margin: [0, 20],
      },
    ],
    styles: {
      header: {
        fontSize: 22,
        bold: true,
        margin: [0, 0, 0, 10],
      },
    },
  };

  // Generate the PDF and open it in a new tab
  pdfMake.createPdf(docDefinition).open();
};







const BillGenerator = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState('');
  //   const [supplierList, setSupplierList] = useState([]);
  const [cowMilkFat, setCowMilkFat] = useState('');
  const [cowMilkQuantity, setCowMilkQuantity] = useState('');
  const [buffaloMilkFat, setBuffaloMilkFat] = useState('');
  const [buffaloMilkQuantity, setBuffaloMilkQuantity] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [billDate, setBillDate] = useState(moment().format('YYYY-MM-DD'));
  const [billGenerated, setBillGenerated] = useState('');
  useEffect(() => {
    const fetchSupplierList = async () => {
      const response = await axios.get('http://localhost:7071/suppliers/supplierlist');
      setSuppliers(response.data);
    };

    fetchSupplierList();
  }, []);

  const handleCowMilkFatChange = (e) => {
    setCowMilkFat(e.target.value);
  };

  const handleCowMilkQuantityChange = (e) => {
    setCowMilkQuantity(e.target.value);
  };

  const handleBuffaloMilkFatChange = (e) => {
    setBuffaloMilkFat(e.target.value);
  };

  const handleBuffaloMilkQuantityChange = (e) => {
    setBuffaloMilkQuantity(e.target.value);
  };

  const handleTotalAmountChange = (e) => {
    setTotalAmount(e.target.value);
  };



  const handleConfirmGenerateBill = () => {
    setShowConfirmation(false);
    // Submit form here
  };

  const handleCancelGenerateBill = () => {
    setShowConfirmation(false);
  };


  const handleGenerateBillPDF = () => {
    if (!billGenerated) {
      alert('Please generate the bill first!');
      return;
    }
    if (!selectedSupplierId || (!cowMilkFat && !cowMilkQuantity && !buffaloMilkFat && !buffaloMilkQuantity)) {
      alert("Please fill in the Supplier ID and either Cow's or Buffalo's milk fields.");
      return;
    }

    const billData = {
      supplier_id: selectedSupplierId,
      billDate: billDate,
      cowMilkFat: cowMilkFat,
      cowMilkQuantity: cowMilkQuantity,
      buffaloMilkFat: buffaloMilkFat,
      buffaloMilkQuantity: buffaloMilkQuantity,
      totalAmount: totalAmount
    };

    generatePDF(billData);


    alert('Collect your bill copy from the desk! Thank you');
    setSelectedSupplierId('');
    setCowMilkFat('');
    setCowMilkQuantity('');
    setBuffaloMilkFat('');
    setBuffaloMilkQuantity('');
    setTotalAmount('');
    setBillGenerated(false);
  };


  const handleGenerateBill = async () => {
    if (!selectedSupplierId) {
      alert("Please select supplier id");
      return;
    }
    if (!cowMilkQuantity && !cowMilkFat && !buffaloMilkQuantity && !buffaloMilkFat) {
      alert("Please fill at least one field for cow or buffalo milk");
      return;
    }
    const billData = {
      supplier_id: selectedSupplierId,

      billDate: billDate,
      cowMilkFat: cowMilkFat,
      cowMilkQuantity: cowMilkQuantity,
      buffaloMilkFat: buffaloMilkFat,
      buffaloMilkQuantity: buffaloMilkQuantity,
      totalAmount: totalAmount,
      confirmed: false  //field to track confirmation status
    };
    try {
      setShowConfirmation(true);
      alert("We recieved your bill. If you want Hard copy please click on Print Bill.");
      await axios.post('http://localhost:7071/bills/generate-bill', billData);

      setBillGenerated(true); // Set billGenerated to true
      // setCowMilkFat('');
      // setCowMilkQuantity('');
      // setBuffaloMilkFat('');
      // setBuffaloMilkQuantity('');
      // setTotalAmount('');
    } catch (error) {
      console.error(error);
      alert('Error generating bill!');
    }

    setShowConfirmation(false);
  };

  // generatePDF(billData);
  //  setShowConfirmation(true);
  //  await new Promise((resolve) => {
  //   const interval = setInterval(() => {
  //     if (billData.confirmed) {
  //       clearInterval(interval);
  //       resolve();
  //     }
  //   }, 1000);
  // });
  // if (billData.confirmed) {
  //   generatePDF(billData);
  //     await axios.post('http://localhost:7071/bills/generate-bill', billData);

  //     setCowMilkFat('');
  //     setCowMilkQuantity('');
  //     setBuffaloMilkFat('');
  //     setBuffaloMilkQuantity('');
  //     setTotalAmount('');

  //     setShowConfirmation(false);
  //   }else {
  //     alert('Please confirm the bill before generating the PDF.');
  //   }
  // };

  const handleSupplierChange = (e) => {
    setSelectedSupplierId(e.target.value);
  };

  const calculateTotalAmount = () => {
    let total = 0;

    if (cowMilkQuantity !== '' && cowMilkFat !== '') {
      const cowMilkPrice = parseFloat(cowMilkFat) * parseFloat(cowMilkQuantity);
      total += cowMilkPrice;
    }

    if (buffaloMilkQuantity !== '' && buffaloMilkFat !== '') {
      const buffaloMilkPrice = parseFloat(buffaloMilkFat) * parseFloat(buffaloMilkQuantity);
      total += buffaloMilkPrice;
    }

    setTotalAmount(total.toFixed(2));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [cowMilkFat, cowMilkQuantity, buffaloMilkFat, buffaloMilkQuantity]);

  return (
    <>
      <h1 className='my-5'>Bill Generator</h1>
      <Table striped bordered hover className='body' bgcolor='#CCC'>
        <tbody>
          <tr>
            <td className='table-th'>
              <strong>Supplier:</strong>
            </td>
            <td className='table-td'>
              <select className='form-control' onChange={handleSupplierChange}>
                <option value=''>--Select Supplier--</option>
                {suppliers.map((supplier) => (
                  <option value={supplier.supplierId} key={supplier.supplierId}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className='table-th'>
              <strong>Bill Date:</strong>
            </td>
            <td >{billDate}</td>
          </tr>
          <tr>
            <td className='table-th'>
              <strong>Cow Milk Fat:</strong>
            </td>
            <td className='table-td'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter cow milk fat'
                value={cowMilkFat}
                onChange={handleCowMilkFatChange}
                max={10}

              />
            </td>
          </tr>
          <tr>
            <td className='table-th'>
              <strong>Cow Milk Quantity:</strong>
            </td>
            <td className='table-td'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter cow milk quantity in liters'
                value={cowMilkQuantity}
                onChange={handleCowMilkQuantityChange}
              />
            </td>
          </tr>
          <tr>
            <td className='table-th'>
              <strong>Buffalo Milk Fat:</strong>
            </td>
            <td className='table-td'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter buffalo milk fat'
                value={buffaloMilkFat}
                onChange={handleBuffaloMilkFatChange}
                max={10}
              />
            </td>
          </tr>
          <tr>
            <td className='table-th'>
              <strong>Buffalo Milk Quantity:</strong>
            </td>
            <td className='table-td'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter buffalo milk quantity in liters'
                value={buffaloMilkQuantity}
                onChange={handleBuffaloMilkQuantityChange}
              />
            </td>
          </tr>
          <tr>
            <td className='table-th'>
              <strong>Total Amount:</strong>
            </td>
            <td>
              <input type='text' readOnly className='form-control' value={totalAmount} onChange={handleTotalAmountChange} />
            </td>
          </tr>
          <tr>
            <td colSpan='2' className='text-center'>
              <Button className='btn' variant='success' onClick={handleGenerateBill}>
                Generate Bill
              </Button>


              <Button className='btn' variant='success' onClick={handleGenerateBillPDF}>
                Print Bill
              </Button>
            </td>

          </tr>
        </tbody>



        <Modal show={showConfirmation} onHide={handleCancelGenerateBill}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Generate Bill</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to generate the bill?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCancelGenerateBill}>
              Cancel
            </Button>
            <Button variant='primary' onClick={handleConfirmGenerateBill}>
              Generate
            </Button>
          </Modal.Footer>
        </Modal>
      </Table>
      {showConfirmation && <p>Bill generated successfully!</p>}
    </>
  );
};

export default BillGenerator;




























