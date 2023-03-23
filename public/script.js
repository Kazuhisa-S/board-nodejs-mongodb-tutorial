const threadSectionDOM = document.querySelector(".thread-section");
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");

let inputText = ""
let inputContentText = ""

//最初はThreadの全てを読み込む
const getAllThreads = async () => {
  try {
    let allThreads = await axios.get("/api/v1/threads");
    console.log(allThreads);
    let { data } = allThreads;
      console.log(data);

      //出力
      allThreads = data.map((Thread) => {
        const { title, content } = Thread;
        console.log(title, content);
        return`
          <div class="single-thread">
            <h3>${title}</h3>
            <p>${content}</p>
          </div>
        `;
      });
      threadSectionDOM.innerHTML = allThreads;
  } catch (err) {
    console.log(err);
  }
};

getAllThreads();

//postメソッド
inputTextDOM.addEventListener("change", (e) => {
  inputText = e.target.value;
});

inputContentDOM.addEventListener("change", (e) => {
  inputContentText = e.target.value;
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  if(inputText && inputContentText) {
    console.log("add data");
    try{
      await axios.post("/api/v1/threads", {
        title: inputText,
        content: inputContentText,
      });
    } catch (err) {
      console.log(err);
    }
  }
});
