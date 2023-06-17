import { useRef, useState, useEffect } from "react";

function NoteInfo(props) {
  const [parameter, setParameter] = useState(props.param);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const editTitleRef = useRef(null);
  const editContentRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    fetchData(parameter); // Gọi API khi giá trị tham số thay đổi
  }, [parameter]);

  //Giải quyết sự kiến ấn vào nút cancel
  const handleCancelClick = (event) => {
    console.log("oke");
    fetchData(parameter);
    setShow(false);
  };

  //Hàm gọi api,lấy dữ liệu của 1 note
  async function fetchData(parameter) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/note?id=${parameter}`,
        { method: "GET" }
      );
      const data = await response.json();
      // console.log(data); // Xử lý dữ liệu API ở đây
      console.log(data.data.title);
      editTitleRef.current.innerText = data.data.title;
      editContentRef.current.innerText = data.data.description;
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  //Giải quyết sự kiến ấn vào nút save
  const handleSaveClick = (event) => {
    const editedTitle = sanitizeInput(editTitleRef.current.innerText);
    const editedContent = sanitizeInput(editContentRef.current.innerText);
    console.log("Edited title:", editedTitle);

    const postData = {
      // Đối tượng bạn muốn truyền trong phần body
      id: `${parameter}`,
      title: `${editedTitle}`,
      description: `${editedContent}`,
    };

    fetchSaveData(postData); // Gọi API và truyền đối tượng trong phần body

    setTitle(editedTitle);
    setContent(editedContent);
    setShow(false);
  };

  //Hàm gọi api,cập nhật lại dữ liệu cả 1 note
  async function fetchSaveData(postData) {
    try {
      const response = await fetch("http://localhost:8080/api/v1/note", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log(data); // Xử lý dữ liệu API ở đây
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  //hàm check dữ liệu đầu vào
  const sanitizeInput = (input) => {
    // Loại bỏ các thẻ HTML và ký tự đặc biệt không mong muốn
    const sanitizedText = input.replace(/<[^>]+>/g, "");
    return sanitizedText;
  };

  //click ngoài phần tử muốn edit,tự động tắt nút save,cancel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div ref={divRef} style={{ width: 600 }}>
      <h4
        onClick={() => setShow(true)}
        contentEditable={true}
        ref={editTitleRef}
        style={{
          wordWrap: "break-word",
          width: 500,
          padding: "5px",
          fontSize: 30,
          margin: 0,
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        onClick={() => setShow(true)}
        contentEditable={true}
        ref={editContentRef}
        style={{ wordWrap: "break-word", width: 500, padding: "5px" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {show && (
        <>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default NoteInfo;