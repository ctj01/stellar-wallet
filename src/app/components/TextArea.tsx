import { useState } from "react";
import { PrimaryButton } from "./PrimaryButton";

interface Props {
    label: string;
    value: string | undefined,
    type?: string
}

export const CopyToClipboard = ( props : Props) => {


    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(props.value as string);
            setCopied(true);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="flex justify-between items-center">
            <div className="text-gray-500">{props.label}</div>
            <input
                type={props.type}
                value={props.value}
                style={{ width: "60%" }}
                className="border border-gray-300 rounded p-2"
                placeholder={props.label}
                readOnly={true}
            />
           <PrimaryButton onClick={copyToClipboard} text="Copy to clipboard" />
            {copied && <span className="mt-2 text-green-500">Copied!</span>}
        </div>
    );
}