var mainBtn = document.querySelector("#mybtn");

mainBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const btn = document.querySelector("button");
  btn.className = "btn btn-secondary";
  const userName = document.querySelector("#codefHandleInput").value;
  if (!userName) {
    alert("Please enter a valid username");
    return;
  }

  const fetchURL = `/query?name=${userName}`;

  fetch(fetchURL).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        btn.className = "btn btn-danger";
        alert("Please enter the correct username    ");

        return;
      }

      //This part is for favourite language
      var favLang = "";
      var favLangCnt = -1;

      for (var key of Object.keys(data.lang)) {
        // console.log(key + " -> " + data.lang[key]);
        if (favLangCnt < data.lang[key]) {
          favLangCnt = data.lang[key];
          favLang = key;
        }
      }

      var list = [];
      for (var key of Object.keys(data.type)) {
        list.push([key, data.type[key]]);
      }

      list.sort((a, b) => {
        return b[1] - a[1];
      });

      var elem = `<div class="notification is-primary is-bold" style="width:650px" id="divres">
               <h1 class="roboto"> Codeforces-Rewind</h1>
               
               <br>
               <center><h3>========My 2020 Wrapped========<h3><center>
               <br>
               <div class="black">
               This year I successfully                      
               <br>
               solved <strong>${data.cnt}</strong> questions
               </div>
                <br>
                <hr>
                <br>
                Looks like this year
                <br>
                <i>${favLang}</i> was my favourite Language.
                <br>
                I have used ${favLang} <strong>${favLangCnt}</strong> times
                <br>
                <hr>
                <br>
                <div class="black">
                This year is solved ${list[0][1]}
                <br>
                problems of <strong> ${list[0][0]} <strong> type.
                </div>
                <br>
                <hr>
                <br>
                The other 2 types of problems that I really liked is 
                <br>
                2 . ${list[1][0]} (solved ${list[1][1]})
                <br>
                3 . ${list[2][0]} (solved ${list[2][1]})
                </div>
                <br><br>   
                `;
      btn.className = "btn btn-primary";
      document.querySelector("#res").innerHTML = elem;
    });
  });
});
