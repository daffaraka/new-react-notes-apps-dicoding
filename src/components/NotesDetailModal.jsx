import React from "react";


class NotesDetailModal extends React.Component {
    render() {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-slate-800 truncate">{this.props.note.title}</h3>
                            <button onClick={this.props.onClose} className="text-slate-400 hover:text-slate-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <h3 className="text-gray-800">{this.props.note.title} </h3>
                        <p className="text-slate-600 whitespace-pre-line">{this.props.note.body}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotesDetailModal;