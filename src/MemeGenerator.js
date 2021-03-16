import React, {useState, useEffect} from 'react';
import axios from 'axios';

function MemeGenerator(){
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
//   const [inputText, setInputText] = useState({
//     topText: "",
//     bottomText: "",
//   })
  const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg");
  const [allMemes, setAllMemes] = useState([])

  useEffect(() => {
       axios.get(`https://api.imgflip.com/get_memes`)
        .then(res => {
            const allMemeImgs = res.data.data.memes;
            setAllMemes(allMemeImgs)
        })
  },[]);


//Alternative approach #2 (for reference)
//   const handleChange = e => {
//     setInputText({
//       ...inputText,
//       [e.target.name]: e.target.value,
//     })
//   }

   function handleSubmit(e){
      e.preventDefault()
      const randNum = Math.floor(Math.random() * allMemes.length)
      const randomimg = allMemes[randNum].url
      setRandomImg(randomimg);
    }

    return (
        <>
        <form className="meme-form" onSubmit={handleSubmit}>
            <input type="text"
            value={topText}
            name="topText"
            placeholder="Top Text"
            onChange={(e) => setTopText(e.target.value)}/>
            <input type="text"
            value={bottomText}
            name="bottomText"
            placeholder="Bottom Text"
            onChange={(e) => setBottomText(e.target.value)}/>
           <button>Gen</button>
        </form>
        <div className="meme">
          <img src={randomImg} alt="Random Image" />
          <h2 className="top">{topText}</h2>
          <h2 className="bottom">{bottomText}</h2>
        </div>
        </>
    )
}

export default MemeGenerator;