import{r as m,j as u}from"./iframe-B4lhj_z_.js";import{G as n,a as d}from"./ListAlbum-B5I9xuvJ.js";import{L as a}from"./Logo-BiOHOkjz.js";import"./Button-CwQHdrwD.js";import"./classNames-BdDPySru.js";import"./ButtonNavigation-DXLGc1qs.js";import"./iconBase-CC7d0cbF.js";import"./sidebarStore-uOLbEKmr.js";import"./Dropdown-CRI7bajl.js";import"./FilePicker-7EWV4xM6.js";import"./useTranslation-CxYHiHz7.js";import"./Text-Co-3Dd8e.js";import"./Input-DYnk9Q6Y.js";import"./Like-BFSfE9XD.js";import"./index-VvZaZ5ER.js";import"./Loader-CF5-Kbzb.js";import"./index-A0F4GMPq.js";import"./index-C5rFHmEs.js";import"./Modal-BhkLJJnL.js";import"./PageLoader-B-paAarP.js";import"./PageWrapper-cJklpNIB.js";import"./TrackControlButton-Ix8zLQEJ.js";import"./UserAvatar-CeMDOejw.js";const l={id:"1",name:"Mock Group",userId:"user-1",genre:"Рок",cover:a,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},F={title:"shared/GroupCover",component:n,tags:["autodocs"]},e={args:{edit:!1,preview:null,onIconChange:void 0}},r={args:{edit:!1,preview:"https://via.placeholder.com/256x256.png?text=Preview+Image"}},t={render:()=>{const[s,i]=m.useState(a);d.setState({currentGroup:l});const p=o=>{if(o&&o[0]){const c=URL.createObjectURL(o[0]);i(c)}};return u.jsx(n,{edit:!0,preview:s,onIconChange:p})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    edit: false,
    preview: null,
    onIconChange: undefined
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    edit: false,
    preview: 'https://via.placeholder.com/256x256.png?text=Preview+Image'
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [preview, setPreview] = useState<string | null>(Logo);
    useGroupStore.setState({
      currentGroup: mockGroup
    });
    const handleIconChange = (files: FileList | null) => {
      if (files && files[0]) {
        const url = URL.createObjectURL(files[0]);
        setPreview(url);
      }
    };
    return <GroupCover edit preview={preview} onIconChange={handleIconChange} />;
  }
}`,...t.parameters?.docs?.source}}};const M=["Default","WithPreview","Editable"];export{e as Default,t as Editable,r as WithPreview,M as __namedExportsOrder,F as default};
