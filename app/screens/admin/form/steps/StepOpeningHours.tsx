import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Modal, Platform, Pressable, ScrollView, View } from "react-native";

import { Days } from "@/app/types/Days";
import { ThemedText } from "@/components/themed-text";
import { CreateBarbershopFormData } from "../schema";

function formatTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function StepOpeningHours() {
  const { control, setValue } = useFormContext<CreateBarbershopFormData>();

  const { fields } = useFieldArray({
    control,
    name: "openingHours",
  });

  const [picker, setPicker] = useState<{
    index: number;
    type: "open" | "close";
    visible: boolean;
    date: Date;
  }>({
    index: 0,
    type: "open",
    visible: false,
    date: new Date(),
  });

  function openPicker(index: number, type: "open" | "close") {
    setPicker({
      index,
      type,
      visible: true,
      date: new Date(),
    });
  }

  function handleChange(_: any, selectedDate?: Date) {
    if (selectedDate) {
      setPicker((prev) => ({
        ...prev,
        date: selectedDate,
      }));
    }
  }

  function handleConfirm() {
    const formatted = formatTime(picker.date);

    setValue(`openingHours.${picker.index}.${picker.type}`, formatted, {
      shouldValidate: true,
    });

    setPicker((prev) => ({ ...prev, visible: false }));
  }

  return (
    <ScrollView
      contentContainerStyle={{ marginTop: 40, paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      {fields.map((field, index) => (
        <View key={field.id} style={{ marginBottom: 10 }}>
          <ThemedText style={{ fontWeight: "bold" }}>{Days[index]} </ThemedText>

          {/* ABERTURA */}
          <Controller
            control={control}
            name={`openingHours.${index}.open`}
            render={({ field: { value } }) => (
              <Pressable
                onPress={() => openPicker(index, "open")}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: "#1e1e1e",
                  marginTop: 8,
                }}
              >
                <ThemedText>
                  {value ? `Abertura: ${value}` : "Selecionar abertura"}
                </ThemedText>
              </Pressable>
            )}
          />

          {/* FECHAMENTO */}
          <Controller
            control={control}
            name={`openingHours.${index}.close`}
            render={({ field: { value } }) => (
              <Pressable
                onPress={() => openPicker(index, "close")}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: "#1e1e1e",
                  marginTop: 8,
                }}
              >
                <ThemedText>
                  {value ? `Fechamento: ${value}` : "Selecionar fechamento"}
                </ThemedText>
              </Pressable>
            )}
          />
        </View>
      ))}

      {/* MODAL iOS STYLE */}
      <Modal transparent visible={picker.visible} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <View
            style={{
              backgroundColor: "#1e1e1e",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            {/* HEADER */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Pressable
                onPress={() =>
                  setPicker((prev) => ({ ...prev, visible: false }))
                }
              >
                <ThemedText style={{ color: "gray" }}>Cancelar</ThemedText>
              </Pressable>

              <Pressable onPress={handleConfirm}>
                <ThemedText style={{ color: "#00d5ff" }}>Confirmar</ThemedText>
              </Pressable>
            </View>

            {/* PICKER */}
            <DateTimePicker
              value={picker.date}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleChange}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
