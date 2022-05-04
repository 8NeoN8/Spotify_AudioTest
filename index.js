function getElementId(element){
    return document.getElementById(element);
}

const audio_playPause = getElementId("music_button_playPause");
const button_repeat = getElementId("music_button_repeat");
const button_stop = getElementId("music_button_stop");
const duration_total = getElementId("duration_total");
const duration_current = getElementId("duration_current");
const music_container = getElementId("music_container");
const button_previous = getElementId("music_button_previous");
const button_next = getElementId("music_button_next");
let clickedPlay = 0;
let clickedRepeat = 0;
let current_Song = 0

let song_playlist = [

    {
        "name":"Peace and Tranquility",
        "artist":"Pascal Michael Stiefel",
        "duration":"3:0",
        "image":"Peace and Tranquility.jpg"

    },
    {
        "name":"Usseewa",
        "artist":"Ado",
        "duration":"3:22",
        "image":"Usseewa.jpg"
    },
    {
        "name":"Red",
        "artist":"Calliope Mori",
        "duration":"3:43",
        "image":"Red.png"
    },
    {
        "name":"What A Wonderful World",
        "artist":"Louis Armstrong",
        "duration":"2:13",
        "image":"What A Wonderful World.jpg"
    },
    {
        "name":"Smooth Criminal",
        "artist":"Michael Jackson",
        "duration":"4:15",
        "image":"Smooth Criminal.jpg"
    }

];

function playFirst(){
    current_Song = 0
    let audio_first = document.createElement('audio');
    audio_first.setAttribute("id","audio_source")
    audio_first.setAttribute("type","audio/mpeg");
    audio_first.setAttribute("src","music/"+songString(song_playlist[current_Song].artist,song_playlist[current_Song].name));
    music_container.appendChild(audio_first);
    
}

playFirst();

const audio = getElementId("audio_source");
audio.volume = 0.005;


audio_playPause.addEventListener("click", ()=>{
    if(clickedPlay==0){
        audio_playPause.innerHTML = '<i class="fa fa-pause"></i>'
        audio.play();
        clickedPlay = 1;
    }else{
        clickedPlay = 0;
        audio.pause();
        audio_playPause.innerHTML = '<i class="fa fa-play"></i>'
    }
    setDescription()
    timer();

})

button_repeat.addEventListener("click", ()=>{
    if(clickedRepeat==0){
        clickedRepeat = 1;
        audio.loop = true;
    }else{
        clickedRepeat = 0;
        audio.loop = false;
    }
})


button_stop.addEventListener("click", ()=>{
    clickedPlay = 0;
    audio.pause();
    audio.currentTime = 0;
    audio_playPause.innerHTML = '<i class="fa fa-play"></i>'
    clearDescription();
})

button_next.addEventListener("click",()=>{
    updateNext();
    timer();
})

function updateNext(){
    current_Song++;
    audio_playPause.innerHTML = '<i class="fa fa-pause"></i>'
    if(current_Song<5){
        audio.setAttribute("src","music/"+songString(song_playlist[current_Song].artist,song_playlist[current_Song].name));
        audio.play();
    }else if(current_Song>4){
        current_Song=0;
        audio.setAttribute("src","music/"+songString(song_playlist[current_Song].artist,song_playlist[current_Song].name));
        audio.play();
    }
    clickedPlay = 1;
    setDescription();
}

button_previous.addEventListener("click",()=>{
    current_Song--;
    audio_playPause.innerHTML = '<i class="fa fa-pause"></i>'
    if(current_Song>0){
        audio.setAttribute("src","music/"+songString(song_playlist[current_Song].artist,song_playlist[current_Song].name));
        audio.play();
    }else if(current_Song<=0){
        current_Song=4;
        audio.setAttribute("src","music/"+songString(song_playlist[current_Song].artist,song_playlist[current_Song].name));
        audio.play();
    }
    clickedPlay = 1;
    setDescription()
    timer();
})

function songString(artist, name){
    return artist+" - "+name+".mp3";
}

function timer(){
    setTimeout(function(){
        let s = parseInt(audio.duration % 60);
        let m = parseInt((audio.duration / 60) % 60);
        duration_total.innerHTML = m + ":" + s;
        audio.addEventListener("timeupdate",()=>{
            let s = parseInt(audio.currentTime % 60);
            let m = parseInt((audio.currentTime / 60) % 60);
            duration_current.innerHTML = m + ":" + s;
            if(duration_total.textContent==duration_current.textContent){
                updateNext();
            } 
        },false)
    },200)
}

function creaElement(element){
    return document.createElement(element)
}

function attr(element, attr, value){
    return element.setAttribute(attr, value);
}


const description_content = getElementId("description_content");
const br1 = creaElement("br");
const br2 = creaElement("br");
const br3 = creaElement("br");

const music_name = creaElement("span");
attr(music_name,"id","music_name");
const music_artist = creaElement("span");
attr(music_artist,"id","music_artist");
const music_duration = creaElement("span");
attr(music_duration,"id","music_duration");
const music_image = creaElement("img");
attr(music_image,"id","music_image");
description_content.appendChild(music_name);
description_content.appendChild(br1);
description_content.appendChild(music_artist);
description_content.appendChild(br2);
description_content.appendChild(music_duration);
description_content.appendChild(br3);
description_content.appendChild(music_image);



function setDescValues(element,content){
    element.textContent = content;
    
}

function clearDescription(){
    setDescValues(music_name,"");
    setDescValues(music_artist,"");
    setDescValues(music_duration,"");
    attr(music_image, "src", "");

}

function setDescription(){
    
    setDescValues(music_name,"Name: "+song_playlist[current_Song].name);
    setDescValues(music_artist,"artist: "+song_playlist[current_Song].artist);
    setDescValues(music_duration,"Duration: "+song_playlist[current_Song].duration);

    attr(music_image, "src", "covers/"+song_playlist[current_Song].image);
}


const music_volume = getElementId("music_volume");
const volume_value = getElementId("volume_value");

let volume = 0;



music_volume.addEventListener("input", ()=>{
    volume = music_volume.value/3000;
    console.log(volume)
    audio.volume = volume;
    let volume_display = music_volume.value
    console.log(volume_display)
    volume_value.textContent = parseInt(volume_display);
})

const comment_user = getElementId("comment_user")
const comment_content = getElementId("comment_content");
const button_comment = getElementId("button_comment");
const commented = getElementId("commented");

button_comment.addEventListener("click",()=>{
    if(!comment_content.value){
        return
    }else if(comment_user.value){
        console.log("hey1")
        printComment(comment_user.value+":", comment_content.value);
        comment_user.value = "";
        comment_content.value = "";
    }else{
        console.log("hey2")
        let randomUser = parseInt(getRandom(1000,9999));
        printComment("User"+randomUser+":", comment_content.value);
        comment_content.value = "";
    }
    
})

function printComment(user,content){
    let c_wrap = creaElement("div");
    commented.appendChild(c_wrap);
    c_wrap.classList.add("comment");

    let c_user = creaElement("span");
    let c_content = creaElement("span");
    
    c_wrap.appendChild(c_user);
    c_wrap.appendChild(c_content);

    c_user.textContent = user;
    c_content.textContent = content;

    c_user.classList.add("comment_username");
    c_content.classList.add("comment_content");
}

function getRandom(min, max){
    return Math.random() * (max - min) + min;
}

let clickedDesc = 0

openClose_desc.addEventListener("click",()=>{
    if(clickedDesc==0 && clickedPlay==1){
        clickedDesc=1;
        console.log(clickedDesc)
        description_content.classList.remove("hidden");
        description_content.classList.add("show");
    }else{
        clickedDesc=0;
        description_content.classList.remove("show");
        description_content.classList.add("hidden");
    }
})