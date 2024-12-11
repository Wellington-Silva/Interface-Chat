const UserMessage = (props) => {
    return (
        <div className="user-message">
            <img
                src={props.picture}
                alt="group"
            />
            <p>
                <strong>{props.members[0].name}:</strong> Olá! Como vai?
            </p>
        </div>
    )
};

export default UserMessage;