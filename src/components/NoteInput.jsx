import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      error: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState({ title: event.target.value.slice(0, 50) });
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value, error: '' });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    if (this.state.body.length < 10) {
      this.setState({ error: 'Isi catatan minimal 10 karakter.' });
      return;
    }
    this.props.addNote({ title: this.state.title, body: this.state.body });
    this.setState({ title: '', body: '', error: '' });
  }

  render() {
    const { title, body, error } = this.state;
    const remainingChars = 50 - title.length;
    const isNearLimit = remainingChars < 10;

    return (
      <div
        className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        data-testid="note-input"
      >
        {/* Card header */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-sm font-bold text-slate-700">Catatan Baru</h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={this.onSubmitEventHandler} className="p-5 space-y-4" data-testid="note-input-form">

          {error && (
            <div className="note-input__feedback--error flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5" data-testid="note-input-error">
              <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Title field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Judul</label>
              <span
                className={`text-xs font-medium tabular-nums ${isNearLimit ? 'text-red-500' : 'text-slate-400'}`}
                data-testid="note-input-title-remaining"
              >
                {remainingChars}/50
              </span>
            </div>
            <input
              className="note-input__title w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              type="text"
              placeholder="Judul catatan..."
              value={title}
              onChange={this.onTitleChangeEventHandler}
              required
              data-testid="note-input-title-field"
            />
            {isNearLimit && (
              <p className="text-xs text-red-400">Hampir mencapai batas karakter.</p>
            )}
          </div>

          {/* Body field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Isi Catatan</label>
            <textarea
              className="note-input__body w-full px-3.5 py-2.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none min-h-32"
              placeholder="Tulis isi catatanmu di sini..."
              value={body}
              onChange={this.onBodyChangeEventHandler}
              required
              data-testid="note-input-body-field"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors shadow-sm shadow-blue-200 flex items-center justify-center gap-2"
            data-testid="note-input-submit-button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Buat Catatan
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
