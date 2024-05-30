import { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module-react'
// import VideoResize from 'quill-video-resize-module'

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size')
Size.whitelist = ['extra-small', 'small', 'medium', 'large']
Quill.register(Size, true)

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font')
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida']
Quill.register(Font, true)

// Modules object for setting up the Quill editor
Quill.register('modules/imageResize', ImageResize)
// Quill.register('modules/VideoResize', VideoResize)
// Custom Tool Bar
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }, { size: ['extra-small', 'small', 'medium', 'large'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'color', 'image', 'video'],
    ['clean']
  ],
  imageResize: {
    parchment: Quill.import('parchment')
    // See optional "config" below
  }
}

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'script',
  'blockquote',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'video',
  'clean'
]
