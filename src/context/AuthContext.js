import {
	useContext,
	useState,
	useEffect,
	useCallback,
	createContext,
} from "react";
import { db, firebaseApp } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import {
	getAuth,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	updatePassword,
	signOut,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import Splash from "../components/splashscreen";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [wallet, setWallet] = useState([]);
	const [walletHistory, setWalletHistory] = useState([]);

	const auth = getAuth(firebaseApp);
	const user = auth.currentUser;

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	function resetPassword(email) {
		return sendPasswordResetEmail(auth, email);
	}

	function updatePass(password) {
		return updatePassword(user, password);
	}
	function verifyEmail() {
		return sendEmailVerification(auth.currentUser);
	}
	function updateUser(userInfo) {
		return updateProfile(auth.currentUser, userInfo);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			// setCurrentUser(user);
			// setLoading(false);

			if (user) {
				user.getIdTokenResult()
					.then((idTokenResult) => {
						if (idTokenResult.claims.admin) {
							user.admin = idTokenResult.claims.admin;
							setCurrentUser(user);
							setLoading(false);
						}
					})
					.catch((err) => {
						console.log(err);
					});
				setCurrentUser(user);
				setLoading(false);
			} else {
				setCurrentUser(null);
				setLoading(false);
			}
		});

		return unsubscribe;
	}, [auth]);

	//wallet balance
	const getWalletBalance = useCallback(async () => {
		const ref = doc(db, "users", currentUser?.uid, "wallet", "balaance");
		const docSnap = await getDoc(ref);
		if (docSnap.exists()) {
			return setWallet({ data: docSnap.data() });
		} else {
			console.log("No such document!");
		}
	}, [currentUser, setWallet]);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updatePass,
		verifyEmail,
		updateUser,
		wallet,
		walletHistory,
		setWalletHistory,
		getWalletBalance,
		loading,
	};

	return (
		<AuthContext.Provider value={value}>
			{loading && <Splash />}
			{!loading && children}
		</AuthContext.Provider>
	);
}
