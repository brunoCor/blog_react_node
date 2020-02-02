import React from "react";

class Title extends React.Component {
    render() {
        const {title, subTitle} = this.props;
        return (
            <div className="p-2 text-center">
                <h1 className="mb-0">{title}</h1>
                {subTitle && <strong>{subTitle}</strong>}
            </div>
        );
    }
    
}

export default Title;