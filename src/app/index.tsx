import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { SWMLogo } from "@/components/SWMLogo";
import { LAUNCH_GALLERY_ON_START } from "@/config/constants";
import { Href, Link, Redirect } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCENARIOS = [
  {
    slug: "rn-image-in-scroll-view",
    title: "RNImage in ScrollView demo",
    path: "/list-scenarios/rn-image-in-scroll-view-demo",
  },
  {
    slug: "expo-image-in-scroll-view",
    title: "ExpoImage in ScrollView demo",
    path: "/list-scenarios/expo-image-in-scroll-view-demo",
  },
  {
    slug: "flatlist",
    title: "FlatList demo",
    path: "/list-scenarios/flatlist-demo",
  },
  {
    slug: "flashlist",
    title: "FlashList demo",
    path: "/list-scenarios/flashlist-demo",
  },
  {
    slug: "legend-list",
    title: "Legend List demo",
    path: "/list-scenarios/legendlist-demo",
  },
  {
    slug: "photos-gallery",
    title: "Photos gallery",
    path: "/photos-gallery",
  },
] satisfies { slug: string; title: string; path: Href }[];

export default function Index() {
  if (LAUNCH_GALLERY_ON_START) {
    return <Redirect href="/photos-gallery" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Logo />

        <View style={styles.buttonContainer}>
          {SCENARIOS.map((scenario, idx) => (
            <Link href={scenario.path} asChild key={`${idx}-${scenario.path}`}>
              <Button testID={`test-${scenario.slug}`}>
                {`${idx + 1}. ${scenario.title}`}
              </Button>
            </Link>
          ))}
        </View>

        <View style={styles.footer}>
          <Link href="/settings" asChild>
            <Button invert>Settings</Button>
          </Link>
          <SWMLogo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 16,
    padding: 16,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: 16,
    width: "100%",
  },
  footer: {
    rowGap: 8,
  },
});
