"use strict";const t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","#","$","%","*","+",",","-",".",":",";","=","?","@","[","]","^","_","{","|","}","~"],e=(e,a)=>{var o="";for(let r=1;r<=a;r++){let s=Math.floor(e)/Math.pow(83,a-r)%83;o+=t[Math.floor(s)]}return o},a=t=>{let e=t/255;return e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4)},o=t=>{let e=Math.max(0,Math.min(1,t));return e<=.0031308?Math.round(12.92*e*255+.5):Math.round(255*(1.055*Math.pow(e,1/2.4)-.055)+.5)},r=(t,e)=>(t<0?-1:1)*Math.pow(Math.abs(t),e);class s extends Error{constructor(t){super(t),this.name="ValidationError",this.message=t}}const n=(t,e,o,r)=>{let s=0,n=0,h=0;const i=4*e;for(let l=0;l<e;l++)for(let e=0;e<o;e++){const o=r(l,e);s+=o*a(t[4*l+0+e*i]),n+=o*a(t[4*l+1+e*i]),h+=o*a(t[4*l+2+e*i])}let l=1/(e*o);return[s*l,n*l,h*l]};var h=(t,a,h,i,l)=>{if(i<1||i>9||l<1||l>9)throw new s("BlurHash must have between 1 and 9 components");if(a*h*4!==t.length)throw new s("Width and height must match the pixels array");let c=[];for(let e=0;e<l;e++)for(let o=0;o<i;o++){const r=0==o&&0==e?1:2,s=n(t,a,h,((t,s)=>r*Math.cos(Math.PI*o*t/a)*Math.cos(Math.PI*e*s/h)));c.push(s)}const m=c[0],u=c.slice(1);let f,M="";if(M+=e(i-1+9*(l-1),1),u.length>0){let t=Math.max(...u.map((t=>Math.max(...t)))),a=Math.floor(Math.max(0,Math.min(82,Math.floor(166*t-.5))));f=(a+1)/166,M+=e(a,1)}else f=1,M+=e(0,1);var d;return M+=e((o((d=m)[0])<<16)+(o(d[1])<<8)+o(d[2]),4),u.forEach((t=>{M+=e(((t,e)=>19*Math.floor(Math.max(0,Math.min(18,Math.floor(9*r(t[0]/e,.5)+9.5))))*19+19*Math.floor(Math.max(0,Math.min(18,Math.floor(9*r(t[1]/e,.5)+9.5))))+Math.floor(Math.max(0,Math.min(18,Math.floor(9*r(t[2]/e,.5)+9.5)))))(t,f),2)})),M};const i=require("sharp");var l=({action:t},{services:e,database:a})=>{const o=e.AssetsService,r=e.ItemsService;t("files.upload",(async({key:t},e)=>{var s,n;if(!e.schema)return void console.warn("[Blurhash] Was not given schema. Can't do anything");if(!(null===(n=null===(s=e.schema.collections.directus_files)||void 0===s?void 0:s.fields)||void 0===n?void 0:n.blurhash))return void console.warn("[Blurhash] Migration needs to be run to add blurhash field to images");const l=new o({knex:a,schema:e.schema}),c=new r("directus_files",{knex:a,schema:e.schema});console.log("[Blurhash] Fetching resized image");const m=await l.getAsset(t,{transformationParams:{width:200,quality:80}});if(!["image/jpeg","image/png","image/webp","image/tiff"].includes(m.file.type))return void console.log("[Blurhash] Not an image, skipping");let u=Buffer.from("");m.stream.on("data",(t=>{u=Buffer.concat([u,t])})),m.stream.on("end",(async()=>{const e=await(a=u,new Promise(((t,e)=>{i(a).raw().ensureAlpha().toBuffer(((a,o,{width:r,height:s})=>{if(a)return e(a);t(h(new Uint8ClampedArray(o),r,s,4,4))}))})));var a;c.updateOne(t,{blurhash:e})}))}))};module.exports=l;
