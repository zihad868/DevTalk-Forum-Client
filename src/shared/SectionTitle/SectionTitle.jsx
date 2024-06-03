
const SectionTitle = ({header, content}) => {
    return (
        <div className="space-y-2 mb-3">
            <h3 className="text-center text-2xl font-bold text-secondary">{header}</h3>
            <p className="text-center w-3/4 mx-auto">{content}</p>
        </div>
    );
};

export default SectionTitle;