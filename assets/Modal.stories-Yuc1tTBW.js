import{r as o,j as e}from"./iframe-B4lhj_z_.js";import{M as r}from"./Modal-BhkLJJnL.js";import"./index-A0F4GMPq.js";import"./index-C5rFHmEs.js";import"./classNames-BdDPySru.js";import"./iconBase-CC7d0cbF.js";const u={title:"shared/Modal",component:r,tags:["autodocs"]},t={render:()=>{const[n,s]=o.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>s(!0),className:"px-4 py-2 bg-blue-500 text-white rounded",children:"Открыть модалку"}),e.jsx(r,{isOpen:n,onClose:()=>s(!1),children:e.jsx("div",{className:"text-white",children:"Контент модального окна"})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return <>\r
                <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded">\r
                    Открыть модалку\r
                </button>\r
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>\r
                    <div className="text-white">Контент модального окна</div>\r
                </Modal>\r
            </>;
  }
}`,...t.parameters?.docs?.source}}};const m=["Default"];export{t as Default,m as __namedExportsOrder,u as default};
