// cookie
let cookies = [];


function savecok(judul,value,expired) {
            document.cookie = `${judul}=${value};path=/;max-age=${expired}`;
            cookies.push({judul, value});
        }


function dapetcok(format) {
    if (document.cookie) {
        const cok = document.cookie.split(';');

        for(let m of cok){
            let [judul, value] = m.split('=');
            cookies.push({judul,value})

            if(judul == format){
                return value;
            }
        }
    } else {
        return null;
    }
}

function apuscok(isi) {
    
    // dapetcok('');
    for (let e = 0; e < isi.length; e++) {
        
        document.cookie = `${isi[e].judul}=${isi[e].value};path=/;max-age=0`;

    }
    window.location.reload();
}

// pengaturan svg

jQuery('img').each(function () {
	const $img = jQuery(this);
	const imgID = $img.attr('id');
	const imgClass = $img.attr('class');
	const imgURL = $img.attr('src');
	jQuery.get(
		imgURL,
		(data) => {
		    let $svg = jQuery(data).find('svg');
			if (imgID) $svg.attr('id', imgID);
			if (imgClass) $svg.attr('class', `${imgClass} replaced-svg`);
			$svg.removeAttr('xmlns:a');
			$img.replaceWith($svg);
		},'xml',
	);
});


// edisounds

const detailssound = 'Sounds/rsheet_open1.mp3';
const selectedsound = 'Sounds/rsheet_sel1.mp3';
const confirmedsound = 'Sounds/rsheet_sel2.mp3';
const notifsound = 'Sounds/notifsound.mp3';
const arrowsound = 'Sounds/arrowsound.mp3';

// edisongs
var playlist = ['dQw4w9WgXcQ'];
var player;
var diplaylist = 0;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    console.log('alamak');
    player = new YT.Player('player', {
        // Disarankan minimal 200x200 agar tidak error
        height: '270', 
        width: '480',
        videoId: playlist[diplaylist],
        playerVars: {
            'start': 0, 
            'end': 60,
            'mute': 1,
            'playsinline': 1 // Penting untuk perangkat mobile
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Mulai putar otomatis saat siap
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    // YT.PlayerState.ENDED akan terpicu saat video mencapai 'endSeconds'
    if (event.data === YT.PlayerState.ENDED) {
        nextTrack();
    }
}

function nextTrack() {
    diplaylist = (diplaylist + 1) % playlist.length;
    player.loadVideoById({
        videoId: playlist[diplaylist],
        startSeconds: 0,
        endSeconds: 60
    });
}


// notif
const notifdoc = document.querySelector('.notif');
const bodycontent = document.querySelector('.bodycontent');
let isiannotif;

if (dapetcok('disableux')=='Yes') {
    isiannotif = [];
} else {
    isiannotif = [{
        title:"Attention",
        content:"Accept all cookies? (recommended : No)",
        answer:['Yes','No'],
        about:'disableux'
    }]
}


function munculnotif() {
    document.querySelector('.atasnotif h1').innerHTML = isiannotif[0].title;
    document.querySelector('.tengahnotif h2').innerHTML = isiannotif[0].content;
    document.documentElement.style.overflow = 'hidden';

    let answaer = '';

    for (let i = 0; i < isiannotif[0].answer.length; i++) {

        if (i==0) {

            answaer += `<div class="tombolnotif" value="${isiannotif[0].answer[i]}" tabindex="0" autofocus>
                    <h3>${isiannotif[0].answer[i]}</h3>
                </div>`

        } else{

            answaer += `<div class="tombolnotif" value="${isiannotif[0].answer[i]}" tabindex="0">
                    <h3>${isiannotif[0].answer[i]}</h3>
                </div>`
        }
    }
    document.querySelector('.bawahnotif').innerHTML = answaer;

    setTimeout(() => {
        const tombolnotif = document.querySelectorAll('.tombolnotif');
        notifdoc.style.display = 'block';
        console.log(tombolnotif);
        setTimeout(() => {
            var sounnotif = new Audio(notifsound);
            sounnotif.volume = .5;
            sounnotif.play();
        }, 500);

        tombolnotif[0].focus();

        if (isiannotif[0].answer.length > 1) {

            tombolnotif.forEach( e =>{

                e.style.margin = '0 10px';
                e.addEventListener('focus', ()=>{
                    var sound = new Audio(selectedsound);
                    sound.volume = .3;
                    sound.play();
                    e.focus();
                })
                
                e.addEventListener('mouseenter', ()=>{
                    var sound = new Audio(selectedsound);
                    sound.volume = .3;
                    sound.play();
                    e.focus();
                })

                e.addEventListener('click', ()=>{

                // player.playVideo();
                var sounnotif = new Audio(notifsound);
                sounnotif.play();
                notifdoc.classList.add('notifout');

                if (isiannotif[0].content.includes('Delete')) {
                    
                    if (e.getAttribute('value') == 'Yes') {
                        savecok(isiannotif[0].about, '', 0)

                        setTimeout(()=> {
                        window.location.reload();
                        },1000);
                    }

                } else if (e.getAttribute('value')=='Ok'){
                    isiannotif.shift();

                }else {
                    savecok(isiannotif[0].about, e.getAttribute('value'), 9999999)
                    isiannotif.shift();

                }

                setTimeout(()=> {

                    notifdoc.style.display = 'none';
                    notifdoc.classList.remove('notifout');
                    document.documentElement.style.overflow = 'auto';
                    bodycontent.style.display = 'block';

                },400)
        
                },
            
                e.addEventListener('keypress', function(event) {

                    if (event.key == 'Enter') {
                        
                        notifdoc.classList.add('notifout');

                        if (isiannotif[0].content.includes('Delete')) {
                            
                            if (e.getAttribute('value') == 'Yes') {
                                savecok(isiannotif[0].about, '', 0)

                                setTimeout(()=> {
                                window.location.reload();
                                },1000);
                            }
                        }  else if (e.getAttribute('value')=='Ok'){
                            isiannotif.shift();

                        }else {
                            savecok(isiannotif[0].about, e.getAttribute('value'), 99999999)
                            isiannotif.shift();

                        }
                        setTimeout(()=> {
                            
                            notifdoc.style.display = 'none';
                            notifdoc.classList.remove('notifout');
                            document.documentElement.style.overflow = 'auto';
                            bodycontent.style.display = 'block';

                        },300)
                    }
                })
                )
            })

        } else {

            document.querySelector('.bawahnotif').style.justifyContent = 'unset';
    
            tombolnotif.forEach(e => {
                
                e.addEventListener('click', (e)=>{

                notifdoc.classList.add('notifout');
                var sounnotif = new Audio(notifsound);
                sounnotif.play();

                if (isiannotif[0].about != 'nothing') {
                    savecok(isiannotif[0].about, e.getAttribute('value'), 999999);
                }

                isiannotif.shift();
                setTimeout(()=> {

                    notifdoc.style.display = 'none';
                    notifdoc.classList.remove('notifout');
                    document.documentElement.style.overflow = 'auto';
                    bodycontent.style.display = 'block';

                },300)
        
                }),
            
                e.addEventListener('keydown', function(event) {

                    if (event.key == 'Enter') {
                        notifdoc.classList.add('notifout');
                        var sounnotif = new Audio(notifsound);
                        sounnotif.play();

                        savecok(isiannotif[0].about, e.getAttribute('value'), 999999);
                        isiannotif.shift();
                        

                        setTimeout(()=> {
                            notifdoc.style.display = 'none';
                            notifdoc.classList.remove('notifout');
                            document.documentElement.style.overflow = 'auto';
                            bodycontent.style.display = 'block';

                        },300)
                    }
                })

                e.addEventListener('mouseenter', ()=>{
                    var sound = new Audio(selectedsound);
                    sound.volume = .3;
                    sound.play();
                    e.focus();
                })
            })
        }
    }, 1000);
}


window.addEventListener('load',()=>{

    document.body.style.display = 'block';
    cekin('disableux','No')
});

// cek

function cekin(formatcok, nilaitrue) {
    if (dapetcok(formatcok) == nilaitrue || dapetcok(formatcok) == null) {   
        
        document.documentElement.style.overflow = 'hidden';
        bodycontent.style.display = 'none';
        munculnotif();
    }
}


// header

const deletelogo = document.querySelector('.deleteicon');



deletelogo.addEventListener('click',()=>{


    if (dapetcok("disableux")=='No') {
        isiannotif.push({
            title:"Attention",
            content:"You don't have any cookies yet",
            answer:['Ok'],
            about:'nothing'
        })
    }else {
        isiannotif.push({
            title:"Attention",
            content:"Delete all cookies? (recommended : Yes)",
            answer:['Yes','No'],
            about:'disableux',
        });
    }

    munculnotif();

    
})




// 3d model

// import * as THREE from './node_modules/three/build/three.module.js';

// const carspage = document.querySelector('.cars');//deklarasi buat 3d model


// const scene = new THREE.Scene();//deklarasi sen/environmentny
// scene.background = new THREE.Color(0xf0f0f0);

// const camcar = new THREE.PerspectiveCamera(45, carspage.clientWidth / carspage.clientHeight,1,1000);
// camcar.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(carspage.clientWidth, carspage.clientHeight);
// carspage.appendChild(renderer.domElement);

// //buat bendany
// const geobox = new THREE.BoxGeometry(1,1,1);
// const materialbox = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const box = new THREE.Mesh(geobox,materialbox);

// scene.add(box);

// function animate() {
//     requestAnimationFrame(animate);
//     box.rotation.x += 0;
//     box.rotation.y += 0.01;
//     renderer.render(scene,camcar);
// }

// animate();



window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
}
    
    window.addEventListener('scroll', reveal());
    
    function reveal(){  
        var reveals = document.querySelectorAll('.reveal');
    
        for(var i = 0; i < reveals.length; i++){
    
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 150;
    
            if(revealtop < windowheight - revealpoint){
                reveals[i].classList.add('active');
            }
            else{
                reveals[i].classList.remove('active');
            }
        }
    }





// project cards :
// data IMG :
const databaseImg = [
{
    url: 'Img/SobatTani-logo-nobg.png',
    judul: 'kalkulator'
},
{
    url: 'Img/SobatTani-logo-nobg.png',
    judul: 'Galeri Lightbox'
},
{
    url: 'Img/.png',
    judul: 'Tokisaki Kurumi'
},
{
    url: 'img/signin-out.png',
    judul: 'Sign in | up'
}, 
{
    url: 'img/simplfywebsite.png',
    judul: 'Website Sederhana'
},
{
    url: 'img/todoapp.png',
    judul: 'Todo App'
},'img/browser.svg','img/framework.svg'];


// deklarasi :
const pprojcontent = document.querySelector('div.isiproject');
const logoprojcontent = document.querySelector('div.logoproject');
const next = document.querySelector('div.lanjutproj');
const previous = document.querySelector('div.mundurproj');
let noproj = 0;
let detailproj;



function muncullogoproj() {
    let projcontent = '';
    for (let u = 0; u < databaseImg.length; u++) {

        projcontent += `<div class="card" id="card${u}">
            <img src="${databaseImg[u].url}" alt="${databaseImg[u].judul}">
            <h3>${databaseImg[u].judul}</h3>
        </div>`

        logoprojcontent.innerHTML = projcontent;
    }
    return 1;
}


function munculpproj(i) {
    pprojcontent.innerHTML = `<h2>${databaseImg[i].judul}</h2>
    <p>${databaseImg[i].isi}</p>`
}



detailproj = muncullogoproj();
munculpproj(detailproj);




function majuproj() {
    if (noproj==(databaseImg.length-1)) 
        {return 0;} else {noproj++;}

    logoprojcontent.style.transform = `translatex(calc(${noproj}*-78%))`;
}

next.addEventListener('click', ()=>{
    next.lastElementChild.style.transform = 'translateX(20px) scale(1.1)';
    
    // suarany mas
    var suara = new Audio(arrowsound);
    suara.play();

    setTimeout(() => {
        next.lastElementChild.style.transform = 'translateX(-5px) scale(1.1)';
    }, 100)

    majuproj();
})


function mundur() {
    if (noproj==0) {
        noproj == (databaseImg.length - 1) ;
    } else {noproj--;}

    logoprojcontent.style.transform = `translatex(${noproj*-80}%)`;
}

previous.addEventListener('click', ()=> {
    previous.firstElementChild.style.transform = 'translateX(-20px) scale(1.1) rotate(180deg)';
    
    // suarany mas
    var suara = new Audio(arrowsound);
    suara.play();

    setTimeout(() => {
        previous.firstElementChild.style.transform = 'translateX(10px) scale(1.1) rotate(180deg)';
    }, 100)

    mundur();
})


// data exp
var expdata = {
    "IDENTITAS":[{
        "MUKA":"GANTENG",
        "OTOT":"GEDE"
    }],
    "HARGA DIRI":[{
        "STATUS":"MSH AD",
        "ISTRI":"ALYA-CHAN"
    }]
};
const departdom = document.querySelector('.departdata ul');


let bnr2isiandepart = '';
function listdatafold(name, val) {
    return `<li class="departdata-list" link="${name}"><span class="departdata-listcontent">${name}</span><input class="departvalue" value="${val}" name="${name}" id="${name}" disabled/></li>`
}


for (const f in expdata) {
    let isidepartfold = '';

    isidepartfold += `<details>
            <summary>${f}</summary>`

    expdata[f].forEach(l => {
        for (const y in l) {
        isidepartfold += listdatafold(y, l[y]);
    }
    });

    isidepartfold += '</details>'
    bnr2isiandepart += isidepartfold;
}

departdom.innerHTML = bnr2isiandepart;

// console.log(bnr2isiandepart);


// sounddepart

document.querySelectorAll('.departdata details').forEach(e => {
    e.addEventListener('mouseover',()=>{
        var sound = new Audio(selectedsound);
        sound.volume = .3;
        sound.play();
    })
})

document.querySelectorAll('.departdata details summary').forEach(e =>{
    e.addEventListener('click',()=>{
        new Audio(detailssound).play();
    })
})


