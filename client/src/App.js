import Home from "./components/Home/Home";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ColorBox from "./components/ColorBox/ColorBox";
import Layout from "./components/Navbar/Layout";
import NotFound from "./components/NotFound/NotFound";
import MessageBox from "./components/MessageBox/MessageBox";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MessageBox />
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/admin/register">
              <ColorBox user="Admin" color="blue" register={true} />
            </Route>
            <Route exact path="/teacher/register">
              <ColorBox user="Teacher" color="white" register={true} />
            </Route>
            <Route exact path="/student/register">
              <ColorBox user="Student" color="blue" register={true} />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
