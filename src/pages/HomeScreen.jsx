import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const [targetCount, setTargetCount] = useState(0);
  const animatedCount = useSharedValue(0);
  const fadeAnim = useSharedValue(0);
  const slideY = useSharedValue(30);

  // Simular la llamada a la API
  useEffect(() => {
    const fetchCount = async () => {
      try {
        // Simulamos la respuesta de la API
        setTimeout(() => {
          setTargetCount(15456); // Valor real o fallback
        }, 1000);
      } catch (error) {
        setTargetCount(15456); // fallback
      }
    };
    fetchCount();
  }, []);

  // Animación del contador
  useEffect(() => {
    if (targetCount > 0) {
      animatedCount.value = withTiming(targetCount, {
        duration: 6000, // 6 segundos como en web
      });
    }
  }, [targetCount]);

  // Animaciones de entrada
  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 800 });
    slideY.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });
  }, []);

  // Valor formateado del contador
  const formattedCount = useDerivedValue(() => {
    return Math.floor(animatedCount.value).toLocaleString('es-MX');
  });

  // Estilos animados
  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ translateY: slideY.value }],
    };
  });

  const subtitleStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        {
          translateY: interpolate(
            fadeAnim.value,
            [0, 1],
            [40, 0]
          ),
        },
      ],
    };
  });

  const buttonsStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        {
          translateY: interpolate(
            fadeAnim.value,
            [0, 1],
            [20, 0]
          ),
        },
      ],
    };
  });

  const counterStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [
        {
          translateY: interpolate(
            fadeAnim.value,
            [0, 1],
            [40, 0]
          ),
        },
      ],
    };
  });

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      
        {/* Overlay oscuro */}
        <LinearGradient
          colors={["rgba(40, 1, 2, 0.9)", "rgba(40, 1, 2, 0.7)"]}
          style={styles.overlay}
        >
          <View style={styles.content}>
            {/* Título principal */}
            <Animated.View style={[styles.header, headerStyle]}>
              <Text style={styles.title}>
                Transforma tu vida.{"\n"}
                Impacta a otros.{"\n"}
                <Text style={styles.titleAccent}>Vive LIFE.</Text>
              </Text>
            </Animated.View>

            {/* Subtítulo */}
            <Animated.View style={[styles.subtitleContainer, subtitleStyle]}>
              <Text style={styles.subtitle}>
                Creamos éxito a través de un entrenamiento innovador e irreverente, 
                que lleva al ser humano a lograr resultados sin precedentes.
              </Text>
            </Animated.View>

            {/* Botones */}
            <Animated.View style={[styles.buttonsContainer, buttonsStyle]}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("Events")}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>
                  Ver próximos eventos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("Community")}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>
                  Únete a la comunidad
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Contador animado */}
            <Animated.View style={[styles.counterContainer, counterStyle]}>
              <Animated.Text style={styles.counterText}>
                {formattedCount}
              </Animated.Text>
              <Text style={styles.counterLabel}>
                Vidas transformadas en LIFE Monterrey
              </Text>
            </Animated.View>
          </View>
        </LinearGradient>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#280102",
  },
  scrollContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: "#E63946",
  },
  subtitleContainer: {
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "400",
  },
  buttonsContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 48,
  },
  primaryButton: {
    backgroundColor: "#E63946",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#E63946",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  counterContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  counterText: {
    fontSize: 48,
    fontWeight: "800",
    color: "#E63946",
    fontFamily: "monospace",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  counterLabel: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
});