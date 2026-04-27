import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeConsumer } from '../context/ThemesContext';
import { withNotes } from '../context/NotesContext';

class NewNotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', body: '' };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value.slice(0, 50) });
  }

  onBodyChange(event) {
    this.setState({ body: event.target.value });
  }

  async onSubmit(event) {
    event.preventDefault();
    const { title, body } = this.state;
    if (body.length < 10) return;
    await this.props.notes.onAdd({ title, body });
    this.props.navigate('/');
  }

  render() {
    const { title, body } = this.state;
    const remainingChars = 50 - title.length;
    const isNearLimit = remainingChars < 10;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50'}`}>
            <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
              <button
                onClick={() => this.props.navigate(-1)}
                className={`flex items-center gap-1.5 text-sm mb-6 ${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali
              </button>

              <div className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}>
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                <div className="p-6">
                  <h1 className={`text-lg font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Catatan Baru</h1>

                  <form onSubmit={this.onSubmit} className="space-y-4" data-testid="note-input-form">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className={`text-xs font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Judul</label>
                        <span className={`text-xs font-medium ${isNearLimit ? 'text-red-500' : theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} data-testid="note-input-title-remaining">
                          {remainingChars} karakter tersisa
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="Judul catatan..."
                        value={title}
                        onChange={this.onTitleChange}
                        required
                        data-testid="note-input-title-field"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400'}`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Isi Catatan</label>
                      <textarea
                        placeholder="Tulis isi catatanmu di sini..."
                        value={body}
                        onChange={this.onBodyChange}
                        required
                        data-testid="note-input-body-field"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all resize-none min-h-40 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400'}`}
                      />
                      {body.length > 0 && body.length < 10 && (
                        <p className="text-xs text-red-500">Isi catatan minimal harus 10 karakter</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      data-testid="note-input-submit-button"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      Buat Catatan
                    </button>
                  </form>
                </div>
              </div>
            </main>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}

function NewNotePageWrapper(props) {
  const navigate = useNavigate();
  return <NewNotePage {...props} navigate={navigate} />;
}

export default withNotes(NewNotePageWrapper);
