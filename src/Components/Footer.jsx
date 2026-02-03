import "./Footer.css";
import { useTheme } from "../Context/ModelContext"; // પાથ ચેક કરી લેજો

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    // theme મુજબ ડાયરેક્ટ ક્લાસ બદલાશે
    <footer className={`footer ${theme}`}>
      <p>
        &copy; {currentYear}. All Rights Are reserved <b>BlogPost</b>
      </p>
    </footer>
  );
}
