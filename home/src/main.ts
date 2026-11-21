// The page's one script: its stylesheet, the theme button, the Find field over the guides, a returning reader's progress on them, from
// the cookies and, on a browser linked by sync, from its group, and the hero's backdrop.
import "./home.css";
import { wireBackdrop } from "./backdrop";
import { wireFind } from "./find";
import { wireGroup, wireProgress } from "./progress";
import { wireTheme } from "./theme";

wireTheme();
wireFind();
wireProgress();
void wireGroup();
wireBackdrop();
