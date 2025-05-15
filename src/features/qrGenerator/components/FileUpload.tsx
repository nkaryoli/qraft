interface FileUploadProps {
	image: string;
	onChange: (key: string, value: unknown) => void;

}
const FileUpload: React.FC<FileUploadProps> = ({image, onChange}) => {

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const reader = new FileReader();
			reader.onload = (event) => {
				onChange(image, event.target?.result as string);
			};
			reader.readAsDataURL(e.target.files[0]);
		}
    };

	return (
		<div className="p-4 flex items-center gap-2">
			<label>Upload your own logo:</label>
			<input
				id="image"
				type="file"
				accept="image/*"
				onChange={handleChange}
				className="hidden"
			/>
			<label
				htmlFor="image"
				className="border border-muted bg-card py-1 px-5 rounded-md"
			>
				Select File
			</label>
		</div>
	)
}

export default FileUpload