import { useState } from "react";
import axios from "axios";

function FileForm() {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const endpoint = "http://localhost:8000/upload";
  //     const response = await fetch(endpoint, {
  //       method: "POST",
  //       body: formData,
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       console.log("File uploaded sucessfully");
  //     } else {
  //       console.error("Failed to upload file.");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const postConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    const endpoint = "http://localhost:8000/upload";
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(endpoint, formData, postConfig)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Upload file</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input type="file" onChange={handleFileInputChange} />
        </div>
        <button type="submit">Upload</button>
      </form>

      {file && <p>{file.name}</p>}
    </div>
  );
}

export default FileForm;
