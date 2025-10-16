import{j as r}from"./iframe-B4lhj_z_.js";import{b as s}from"./Button-CwQHdrwD.js";import"./ButtonNavigation-DXLGc1qs.js";import"./Dropdown-CRI7bajl.js";import"./FilePicker-7EWV4xM6.js";import{P as n}from"./ListAlbum-B5I9xuvJ.js";import"./Input-DYnk9Q6Y.js";import"./Like-BFSfE9XD.js";import"./Loader-CF5-Kbzb.js";import"./index-A0F4GMPq.js";import"./PageLoader-B-paAarP.js";import{P as i}from"./PageWrapper-cJklpNIB.js";import"./Text-Co-3Dd8e.js";import"./TrackControlButton-Ix8zLQEJ.js";import"./UserAvatar-CeMDOejw.js";import{u as a}from"./sidebarStore-uOLbEKmr.js";import"./classNames-BdDPySru.js";import"./iconBase-CC7d0cbF.js";import"./useTranslation-CxYHiHz7.js";import"./Modal-BhkLJJnL.js";import"./index-VvZaZ5ER.js";import"./index-C5rFHmEs.js";const m=()=>r.jsx("div",{className:"p-4",children:r.jsxs("div",{className:"text-center space-y-4",children:[r.jsx("h1",{className:"text-3xl font-bold text-white drop-shadow-md",children:"🎵 Рекомендации для вас"}),r.jsx(n,{theme:s.OUTLINE,recommendation:!0})]})}),p=()=>r.jsx("div",{className:`
                absolute left-5/9 top-3/6 z-0 pointer-events-none
                w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2
                rounded-full bg-rainbow-gradient animate-gradient-shift
                opacity-50 blur-3xl
                mask-radial
            `}),d=()=>r.jsxs(i,{children:[r.jsx(p,{}),r.jsx(m,{})]}),R={title:"pages/MainPage",component:d,decorators:[o=>(a.setState({isCollapsed:!1}),r.jsx("div",{style:{height:"100vh",backgroundColor:"#141414",padding:"1rem"},children:r.jsx(o,{})}))]},e={},t={decorators:[o=>(a.setState({isCollapsed:!0}),r.jsx(o,{}))]};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    useSidebarStore.setState({
      isCollapsed: true
    });
    return <Story />;
  }]
}`,...t.parameters?.docs?.source}}};const T=["Default","SidebarCollapsed"];export{e as Default,t as SidebarCollapsed,T as __namedExportsOrder,R as default};
