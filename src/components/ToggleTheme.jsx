import { ThemeConsumer } from '../context/ThemesContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => {
                return <button className='p-3 border rounded-md shadow-md mx-4' onClick={toggleTheme}>{theme === 'light' ? <FaMoon /> : <FaSun />}</button>;
            }}
        </ThemeConsumer>
    );
}

export default ToggleTheme;