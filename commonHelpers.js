import{S as k,i as h,a as E}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const u=document.querySelector("#load-more"),p=document.querySelector("#loader");function m(){return u.classList.replace("hidden","load-more")}function a(){return u.classList.replace("load-more","hidden")}function y(){return p.classList.add("loader")}function g(){return p.classList.remove("loader")}const L=document.querySelector(".search-form"),M=document.querySelector(".search-input"),l=document.querySelector(".gallery-list");L.addEventListener("submit",q);u.addEventListener("click",x);let d,c=1,v=40,f="";async function q(r){r.preventDefault(),l.innerHTML="",y(),a(),c=1,f=M.value;try{const o=await w(f);if(o.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");l.innerHTML=b(o.hits),d=new k(".gallery-link",{captionsData:"alt",captionDelay:250}),d.refresh(),m()}catch(o){h.error({title:"",message:o.message,position:"topRight"}),a()}finally{L.reset(),g()}}async function x(){c++,a(),y();try{const r=await w(f);l.insertAdjacentHTML("beforeend",b(r.hits)),d.refresh(),m();const i=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:i.height*2,behavior:"smooth"});const s=Math.floor(r.totalHits/v);if(c>s)throw new Error("We're sorry, but you've reached the end of search results.")}catch(r){a(),h.info({title:"",message:r.message,position:"topRight"})}finally{g()}}async function w(r){return(await E("https://pixabay.com/api/",{params:{key:"14812482-32fb1dc9e3056dda489954fb4",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:v,page:c}})).data}function b(r){return r.map(({webformatURL:o,largeImageURL:i,tags:s,likes:e,views:t,comments:n,downloads:S})=>`
          <li class="gallery-item">
        <div class="img-wrapper">
          <a class="gallery-link" href="${i}">
            <img
            class="gallery-img"
            src="${o}"
            alt="${s}"
            width="360"
            height="200"
          />
          </a>
        </div>
        <div class="info-wrapper">
          <div class="info-block">
            <h3 class="info-caption">Likes</h3>
            <p class="info-text">${e}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Views</h3>
            <p class="info-text">${t}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Comments</h3>
            <p class="info-text">${n}</p>
          </div>
          <div class="info-block">
            <h3 class="info-caption">Downloads</h3>
            <p class="info-text">${S}</p>
          </div>
        </div>
      </li>`).join("")}
//# sourceMappingURL=commonHelpers.js.map
