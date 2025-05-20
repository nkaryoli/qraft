interface LogoOptionsProps {
    onChange: (image: string) => void;
}

const LogoOptions = ({ onChange }: LogoOptionsProps) => {
    return (
        <div className="py-5 flex items-center gap-2">
            <label>Upload your own logo:</label>
            <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            onChange(event.target?.result as string);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                    }
                }}
                className="hidden"
            />
            <label htmlFor="image" className="border border-muted bg-card py-1 px-5 rounded-md">
                Select File
            </label>
        </div>
    );
};

export default LogoOptions;
