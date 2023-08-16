import { NavigationContainer, RouteProp, StackActions, useNavigation, useRoute,} from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type StackParamList = {
	Home: undefined;
	Details: { itemID: number; otherParam?: string };
	Modal: undefined;
	Empanada: undefined;
};

const Stack = createStackNavigator<StackParamList>();

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;

export function HomeScreen() {
	const navigation = useNavigation<HomeScreenNavigationProp>();
	return (
		<View style={styles.homeContainer}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => {
					navigation.navigate("Details", { itemID: 333, otherParam: "Comida Fresca" });
				}}
			/>
			<Button
				title="Go to Modal"
				onPress={() => {
					navigation.navigate("Modal");
				}}
			/>
			<Button
				title="Food"
				onPress={() => {
					navigation.navigate("Empanada");
				}}
			/>
		</View>
	);
}

type FreshEmpanadaNavigationProp = StackNavigationProp<StackParamList, "Empanada">;
export function FreshEmpanada() {
	const navigation = useNavigation<FreshEmpanadaNavigationProp>();
	return (
		<SafeAreaView style={styles.container}>
			<Image
				source={{
					uri: "https://www.lecremedelacrumb.com/wp-content/uploads/2021/04/beef-empanadas-12sm-1.jpg",
				}}
				alt={"fatty goodness"}
				style={styles.empanada}
			/>
			<Text>Fresh Empanadas</Text>
			<Button
				title="Consume"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</SafeAreaView>
	);
}

type DetailsScreenNavigationProp = StackNavigationProp<
	StackParamList,
	"Details"
>;
type DetailsScreenRouteProp = RouteProp<StackParamList, "Details">;

export function DetailsScreen() {
	const navigation = useNavigation<DetailsScreenNavigationProp>();
	const { params } = useRoute<DetailsScreenRouteProp>();
	return (
		<View style={styles.container}>
			<Text>{params.itemID}</Text>
			<Text>{params.otherParam}</Text>
			<Button
				title="Go to Homepage"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}

type ModalScreenNavigationProp = StackNavigationProp<StackParamList, "Modal">;

export function ModalScreen() {
	const navigation = useNavigation<ModalScreenNavigationProp>();

	const closeAndNavigate = () => {
		const unsubscribe = navigation.addListener("transitionEnd", () => {
			navigation.navigate("Details", { itemID: 7 });
			unsubscribe();
		});
		navigation.dispatch(StackActions.pop(1));
	};
	return (
		<View style={styles.container}>
			<Button title="Go to Details" onPress={closeAndNavigate} />
			<Button
				title="Return to modal"
				onPress={() => {
					navigation.push("Modal");
				}}
			/>
		</View>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{
						headerShown: true,
						headerTitle: "Homepage",
						headerTitleStyle: { color: "white"},
						headerStyle: { backgroundColor: "orange" },
					}}
				/>
				<Stack.Screen
					name="Details"
					component={DetailsScreen}
					options={{ headerBackTitle: "Go Back" }}
				/>
				<Stack.Screen
					name="Modal"
					component={ModalScreen}
					options={{ presentation: "modal" }}
				/>
				<Stack.Screen
					name="Empanada"
					component={FreshEmpanada}
					options={{
						headerTitle: "Empanadas",
						headerStyle: {
							backgroundColor: "darkred",
						},
						headerTitleStyle: {
							color: "white",
						},
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	homeContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	empanada: {
		height: 150,
		width: 250,
	},
	buttons: {
		marginVertical: 5,
	},
});