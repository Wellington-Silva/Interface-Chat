const IMessage = (props) => {
    return (
        <div className="i-message">
            <img
                src={props.picture}
                alt="group"
            />
            <p>
                <strong>{props.members[1].name}:</strong> Tudo bem, e você?
            </p>
        </div>
    )
};

export default IMessage;