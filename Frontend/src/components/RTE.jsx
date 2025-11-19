import React from "react";
// import { Editor } from "tinymce";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";


function RTE({name,control,label,defaultValue=""}) {
  return (
    <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1" >
            {label}</label>}

        <Controller
        name={name || "content dalo"}//it will be the key value in the data`s object 
        control={control}
        render={({field:{onChange,value}})=>(// onChange,   // updates the form state when value changes its basically in build methos 
            <Editor
                apiKey='tl7nbl1nmnrj1dlvqeijqj5h0xd3rmre4jsegjwgfnnxj08d'
                initialValue={defaultValue}
                value={value}
                init={{
                    height:500,
                    menubar:true,
                    plugins:[
                        "image",
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "anchor",
                    ],
                     toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help" ,
                     content_style:"body {font-family:Helvetica,Arial,sans-serif;font-size:14px }"
                }}
                onEditorChange={onChange}
            />
  )}
        />
    </div>
  )
}

export default RTE