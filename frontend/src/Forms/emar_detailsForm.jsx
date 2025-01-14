import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const EMARDetailsForm = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    emarId: "",
    emar_sequence: "",
    parent_field_ordinal: "",
    administration_type: "",
    pharmacy_id: "",
    barcode_type: "",
    reason_for_no_barcode: "",
    complete_dose_not_given: "",
    dose_due: "",
    dose_due_unit: "",
    dose_given_unit: "",
    will_remainder_of_dose_be_given: "",
    product_amout_given: "",
    product_given: "",
    product_code: "",
    product_description: "",
    product_description_other: "",
    prior_infusion_rate: "",
    prior_infusion: "",
    infusion_rate: "",
    infusion_rate_adjustment: "",
    infusion_rate_unit: "",
    route: "",
    infusion_complete: "",
    completion_interval: "",
    new_iv_bag_hung: "",
    continued_infusion_in_other_location: "",
    restart_interval: "",
    side: "",
    site: "",
    non_formulary_vision_verification: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const emarDetailsData = {
    ...formData,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the formData to the backend for further processing
    try {
      // Send the data to the backend using a POST request
      const response = await fetch("http://localhost:5000/api/emar-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emarDetailsData),
      });

      if (response.ok) {
        console.log("EMAR Details form submitted successfully!");
        // Handle success (e.g., navigation or other actions)
      } else {
        console.error("Failed to submit EMAR Details form:", response);
      }
    } catch (error) {
      console.error("Error submitting EMAR Details form:", error);
    }
  };

  return (
    <form
      style={{
        margin: "30px",
        marginLeft: "10px",
        border: "2px solid blue",
        padding: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        EMAR Details
      </Typography>
      <TextField
        label="Patient ID"
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="EMAR ID"
        name="emarId"
        value={formData.emarId}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="EMAR Sequence"
        name="emar_sequence"
        value={formData.emar_sequence}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Parent Field Ordinal"
        name="parent_field_ordinal"
        value={formData.parent_field_ordinal}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Administration Type"
        name="administration_type"
        value={formData.administration_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Pharmacy ID"
        name="pharmacy_id"
        value={formData.pharmacy_id}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Barcode Type"
        name="barcode_type"
        value={formData.barcode_type}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Reason for No Barcode"
        name="reason_for_no_barcode"
        value={formData.reason_for_no_barcode}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Complete Dose Not Given"
        name="complete_dose_not_given"
        value={formData.complete_dose_not_given}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dose Due"
        name="dose_due"
        value={formData.dose_due}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dose Due Unit"
        name="dose_due_unit"
        value={formData.dose_due_unit}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Dose Given Unit"
        name="dose_given_unit"
        value={formData.dose_given_unit}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Will Remainder of Dose Be Given"
        name="will_remainder_of_dose_be_given"
        value={formData.will_remainder_of_dose_be_given}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Product Amount Given"
        name="product_amout_given"
        value={formData.product_amout_given}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Product Given"
        name="product_given"
        value={formData.product_given}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Product Code"
        name="product_code"
        value={formData.product_code}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Product Description"
        name="product_description"
        value={formData.product_description}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Product Description (Other)"
        name="product_description_other"
        value={formData.product_description_other}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Prior Infusion Rate"
        name="prior_infusion_rate"
        value={formData.prior_infusion_rate}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Prior Infusion"
        name="prior_infusion"
        value={formData.prior_infusion}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Infusion Rate"
        name="infusion_rate"
        value={formData.infusion_rate}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Infusion Rate Adjustment"
        name="infusion_rate_adjustment"
        value={formData.infusion_rate_adjustment}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Infusion Rate Unit"
        name="infusion_rate_unit"
        value={formData.infusion_rate_unit}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Route"
        name="route"
        value={formData.route}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Infusion Complete"
        name="infusion_complete"
        value={formData.infusion_complete}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Completion Interval"
        name="completion_interval"
        value={formData.completion_interval}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="New IV Bag Hung"
        name="new_iv_bag_hung"
        value={formData.new_iv_bag_hung}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Continued Infusion in Other Location"
        name="continued_infusion_in_other_location"
        value={formData.continued_infusion_in_other_location}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Restart Interval"
        name="restart_interval"
        value={formData.restart_interval}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Side"
        name="side"
        value={formData.side}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Site"
        name="site"
        value={formData.site}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />
      <TextField
        label="Non-Formulary Version Verification"
        name="non_formulary_version_verification"
        value={formData.non_formulary_version_verification}
        onChange={handleChange}
        fullWidth
        required
        style={{ marginBottom: "10px" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EMARDetailsForm;
