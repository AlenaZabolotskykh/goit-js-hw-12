import{S as q,i as p,a as y}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const h=document.querySelector(".gallery");let m=new q(".gallery a",{docClose:!0,close:!0});function g(o){if(o.length===0)p.show({message:"Sorry, there are no images matching your search query. Please try again!"}),h.innerHTML="";else{const t=o.map(({largeImageURL:i,webformatURL:s,tags:e,likes:r,views:l,comments:b,downloads:v})=>`<li class="list">
  <a href="${i}">
    <img src='${s}' alt='${e}'/>
    <div class="item-wrap">
    <h2 class="item-text">Like<p>${r}</p></h2>
    <h2 class="item-text">Views<p>${l}</p></h2>
    <h2 class="item-text">Comments<p>${b}</p></h2>
    <h2 class="item-text">Downloads<p>${v}</p></h2>
  </div>
  </li>`).join("");h.insertAdjacentHTML("beforeend",t),m&&m.refresh()}}const x="https://pixabay.com",w="api/",P="44791676-0ec883c6e453828f8c76360bc";y.defaults.baseURL=x;function L({q:o="",page:t=1,pageSize:i=15}={}){return y.get(w,{params:{key:P,q:o,page:t,per_page:i,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(({data:s})=>s).catch(s=>{console.log(s)})}const f=document.querySelector("form"),$=document.querySelector(".gallery"),u=document.querySelector(".loader"),c=document.querySelector(".button-load");document.querySelector(".spinner");a(u);a(c);f.addEventListener("submit",E);const n={q:"",page:1,pageSize:15,maxPage:0};async function E(o){if(o.preventDefault(),$.innerHTML="",n.page=1,n.q=f.elements.search.value.trim(),!n.q){p.error({title:"Рядок не може бути пустим"});return}d(u),a(c);try{const{hits:t,total:i}=await L(n);n.maxPage=Math.ceil(i/n.pageSize),g(t),t.length>0&&t.length!==i?(d(c),a(u),c.addEventListener("click",S)):a(c)}catch{}finally{f.reset()}}async function S(o){n.page+=1,a(c),d(u);try{const{hits:t}=await L(n);g(t);const s=document.querySelector(".list").getBoundingClientRect().height;window.scrollBy({top:s*4,behavior:"smooth"})}catch(t){console.log(t)}finally{a(u),d(c),n.page===n.maxPage&&(console.log("We're sorry, but you've reached the end of search results."),a(c),c.removeEventListener("click",S))}}function a(o){o.style.display="none"}function d(o){o.style.display="flex"}
//# sourceMappingURL=commonHelpers.js.map