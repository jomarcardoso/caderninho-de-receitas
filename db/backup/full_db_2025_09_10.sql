--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Foods; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Foods" (
    "Id" integer NOT NULL,
    "NamePt" text NOT NULL,
    "DescriptionPt" text NOT NULL,
    "Image" text NOT NULL,
    "NutritionalInformation_Gi" double precision NOT NULL,
    "NutritionalInformation_Calories" double precision NOT NULL,
    "NutritionalInformation_Acidification" double precision NOT NULL,
    "NutritionalInformation_Carbohydrates" double precision NOT NULL,
    "NutritionalInformation_Ashes" double precision NOT NULL,
    "NutritionalInformation_Proteins" double precision NOT NULL,
    "NutritionalInformation_SaturedFats" double precision NOT NULL,
    "NutritionalInformation_MonounsaturatedFats" double precision NOT NULL,
    "NutritionalInformation_PolyunsaturatedFats" double precision NOT NULL,
    "NutritionalInformation_Cholesterol" double precision NOT NULL,
    "NutritionalInformation_TotalFat" double precision NOT NULL,
    "NutritionalInformation_DietaryFiber" double precision NOT NULL,
    "Sugar" double precision NOT NULL,
    "NutritionalInformation_Gl" double precision NOT NULL,
    "UnitOfMeasurement" integer NOT NULL,
    "IsRecipe" boolean NOT NULL,
    "Icon" text NOT NULL,
    "KeysPt" text DEFAULT ''::text NOT NULL,
    "Type" integer DEFAULT 0 NOT NULL,
    "Vitamins_A" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Alanine" double precision DEFAULT 0 NOT NULL,
    "Vitamins_AlphaCarotene" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Arginine" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_AsparticAcid" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B1" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B11" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B12" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B2" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B3" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B5" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B6" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B7" double precision DEFAULT 0 NOT NULL,
    "Vitamins_B9" double precision DEFAULT 0 NOT NULL,
    "Vitamins_BetaCarotene" double precision DEFAULT 0 NOT NULL,
    "Vitamins_C" double precision DEFAULT 0 NOT NULL,
    "Minerals_Calcium" double precision DEFAULT 0 NOT NULL,
    "Vitamins_Choline" double precision DEFAULT 0 NOT NULL,
    "Minerals_Copper" double precision DEFAULT 0 NOT NULL,
    "Vitamins_CryptoxanthinCarotene" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Cystine" double precision DEFAULT 0 NOT NULL,
    "Vitamins_D" double precision DEFAULT 0 NOT NULL,
    "Vitamins_D2" double precision DEFAULT 0 NOT NULL,
    "Vitamins_D3" double precision DEFAULT 0 NOT NULL,
    "Vitamins_E" double precision DEFAULT 0 NOT NULL,
    "Minerals_Fluoride" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_GlutamicAcid" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Glutamine" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Glycine" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Histidine" double precision DEFAULT 0 NOT NULL,
    "Minerals_Iron" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Isoleucine" double precision DEFAULT 0 NOT NULL,
    "Vitamins_K" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Leucine" double precision DEFAULT 0 NOT NULL,
    "Vitamins_Lycopene" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Lysine" double precision DEFAULT 0 NOT NULL,
    "Minerals_Magnesium" double precision DEFAULT 0 NOT NULL,
    "Minerals_Manganese" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Methionine" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Phenylalanine" double precision DEFAULT 0 NOT NULL,
    "Minerals_Phosphorus" double precision DEFAULT 0 NOT NULL,
    "Minerals_Potassium" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Proline" double precision DEFAULT 0 NOT NULL,
    "Minerals_Selenium" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Serine" double precision DEFAULT 0 NOT NULL,
    "Minerals_Sodium" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Threonine" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Tryptophan" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Tyrosine" double precision DEFAULT 0 NOT NULL,
    "AminoAcids_Valine" double precision DEFAULT 0 NOT NULL,
    "Minerals_Zinc" double precision DEFAULT 0 NOT NULL,
    "Description" text DEFAULT ''::text NOT NULL,
    "Name" text DEFAULT ''::text NOT NULL,
    "Keys" text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."Foods" OWNER TO admin;

--
-- Name: Ingredient; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Ingredient" (
    "Id" integer NOT NULL,
    "Text" text NOT NULL,
    "FoodId" integer DEFAULT 0 NOT NULL,
    "Quantity" double precision NOT NULL,
    "MeasureId" integer DEFAULT 0 NOT NULL,
    "RecipeStepId" integer,
    "AminoAcids_Alanine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Arginine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_AsparticAcid" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Cystine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_GlutamicAcid" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Glutamine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Glycine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Histidine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Isoleucine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Leucine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Lysine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Methionine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Phenylalanine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Proline" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Serine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Threonine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Tryptophan" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Tyrosine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Valine" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Calories" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Carbohydrates" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_DietaryFiber" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Calcium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Copper" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Fluoride" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Iron" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Magnesium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Manganese" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Phosphorus" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Potassium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Selenium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Sodium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Zinc" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Proteins" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_TotalFat" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_A" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_AlphaCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B1" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B11" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B12" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B2" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B3" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B5" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B6" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B7" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B9" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_BetaCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_C" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_Choline" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_CryptoxanthinCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D2" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D3" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_E" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_K" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_Lycopene" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Acidification" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Ashes" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Cholesterol" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Gi" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Gl" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_MonounsaturatedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_PolyunsaturatedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_SaturedFats" double precision DEFAULT 0.0 NOT NULL
);


ALTER TABLE public."Ingredient" OWNER TO admin;

--
-- Name: Ingredient_Id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Ingredient" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Ingredient_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Measure; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Measure" (
    "Id" integer NOT NULL,
    "Type" integer NOT NULL,
    "Quantity" double precision NOT NULL,
    "FoodId" integer
);


ALTER TABLE public."Measure" OWNER TO admin;

--
-- Name: Measure_Id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Measure" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Measure_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: RecipeStep; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."RecipeStep" (
    "Id" integer NOT NULL,
    "Title" text NOT NULL,
    "Preparation" text NOT NULL,
    "Additional" text NOT NULL,
    "RecipeId" integer,
    "AminoAcids_Alanine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Arginine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_AsparticAcid" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Cystine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_GlutamicAcid" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Glutamine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Glycine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Histidine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Isoleucine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Leucine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Lysine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Methionine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Phenylalanine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Proline" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Serine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Threonine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Tryptophan" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Tyrosine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Valine" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Calcium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Copper" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Fluoride" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Iron" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Magnesium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Manganese" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Phosphorus" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Potassium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Selenium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Sodium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Zinc" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Acidification" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Ashes" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Calories" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Carbohydrates" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Cholesterol" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_DietaryFiber" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Gi" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Gl" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_MonounsaturatedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_PolyunsaturatedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Proteins" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_SaturedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_TotalFat" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_A" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_AlphaCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B1" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B11" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B12" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B2" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B3" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B5" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B6" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B7" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B9" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_BetaCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_C" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_Choline" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_CryptoxanthinCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D2" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D3" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_E" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_K" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_Lycopene" double precision DEFAULT 0.0 NOT NULL
);


ALTER TABLE public."RecipeStep" OWNER TO admin;

--
-- Name: RecipeStep_Id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."RecipeStep" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."RecipeStep_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Recipes; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Recipes" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "Description" text,
    "Additional" text,
    "OwnerId" text DEFAULT ''::text NOT NULL,
    "AminoAcids_Alanine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Arginine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_AsparticAcid" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Cystine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_GlutamicAcid" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Glutamine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Glycine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Histidine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Isoleucine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Leucine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Lysine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Methionine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Phenylalanine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Proline" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Serine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Threonine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Tryptophan" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Tyrosine" double precision DEFAULT 0.0 NOT NULL,
    "AminoAcids_Valine" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Calcium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Copper" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Fluoride" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Iron" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Magnesium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Manganese" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Phosphorus" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Potassium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Selenium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Sodium" double precision DEFAULT 0.0 NOT NULL,
    "Minerals_Zinc" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Acidification" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Ashes" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Calories" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Carbohydrates" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Cholesterol" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_DietaryFiber" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Gi" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Gl" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_MonounsaturatedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_PolyunsaturatedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_Proteins" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_SaturedFats" double precision DEFAULT 0.0 NOT NULL,
    "NutritionalInformation_TotalFat" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_A" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_AlphaCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B1" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B11" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B12" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B2" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B3" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B5" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B6" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B7" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_B9" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_BetaCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_C" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_Choline" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_CryptoxanthinCarotene" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D2" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_D3" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_E" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_K" double precision DEFAULT 0.0 NOT NULL,
    "Vitamins_Lycopene" double precision DEFAULT 0.0 NOT NULL
);


ALTER TABLE public."Recipes" OWNER TO admin;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO admin;

--
-- Name: foods_Id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Foods" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."foods_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: recipes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

ALTER TABLE public."Recipes" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.recipes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: Foods; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Foods" ("Id", "NamePt", "DescriptionPt", "Image", "NutritionalInformation_Gi", "NutritionalInformation_Calories", "NutritionalInformation_Acidification", "NutritionalInformation_Carbohydrates", "NutritionalInformation_Ashes", "NutritionalInformation_Proteins", "NutritionalInformation_SaturedFats", "NutritionalInformation_MonounsaturatedFats", "NutritionalInformation_PolyunsaturatedFats", "NutritionalInformation_Cholesterol", "NutritionalInformation_TotalFat", "NutritionalInformation_DietaryFiber", "Sugar", "NutritionalInformation_Gl", "UnitOfMeasurement", "IsRecipe", "Icon", "KeysPt", "Type", "Vitamins_A", "AminoAcids_Alanine", "Vitamins_AlphaCarotene", "AminoAcids_Arginine", "AminoAcids_AsparticAcid", "Vitamins_B1", "Vitamins_B11", "Vitamins_B12", "Vitamins_B2", "Vitamins_B3", "Vitamins_B5", "Vitamins_B6", "Vitamins_B7", "Vitamins_B9", "Vitamins_BetaCarotene", "Vitamins_C", "Minerals_Calcium", "Vitamins_Choline", "Minerals_Copper", "Vitamins_CryptoxanthinCarotene", "AminoAcids_Cystine", "Vitamins_D", "Vitamins_D2", "Vitamins_D3", "Vitamins_E", "Minerals_Fluoride", "AminoAcids_GlutamicAcid", "AminoAcids_Glutamine", "AminoAcids_Glycine", "AminoAcids_Histidine", "Minerals_Iron", "AminoAcids_Isoleucine", "Vitamins_K", "AminoAcids_Leucine", "Vitamins_Lycopene", "AminoAcids_Lysine", "Minerals_Magnesium", "Minerals_Manganese", "AminoAcids_Methionine", "AminoAcids_Phenylalanine", "Minerals_Phosphorus", "Minerals_Potassium", "AminoAcids_Proline", "Minerals_Selenium", "AminoAcids_Serine", "Minerals_Sodium", "AminoAcids_Threonine", "AminoAcids_Tryptophan", "AminoAcids_Tyrosine", "AminoAcids_Valine", "Minerals_Zinc", "Description", "Name", "Keys") FROM stdin;
1	Abacate		https://images.unsplash.com/photo-1612215047504-a6c07dbe4f7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	15	160	0	8.529999732971191	0	2	2.125999927520752	0	0	0	14.65999984741211	0	0	0	0	f	/images/food/avocado.svg	avocado	4	7	109	24	88	236	0	0	0	0.12999999523162842	1.7380000352859497	0	0.25699999928474426	0	0	62	10	12	14.199999809265137	0.1899999976158142	0	27	0	0	0	0	0	287	0	104	49	0.550000011920929	84	21	143	0	132	29	0.1420000046491623	38	97	52	485	98	0	114	7	73	25	49	107	0.6399999856948853			
2	Abacaxi		https://images.unsplash.com/photo-1572859730774-2cb70677d258?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80	59	50	0	13.119999885559082	0	0.5400000214576721	0.008999999612569809	0	0	0	0.11999999731779099	0	0	0	0	f	/images/food/pineapple.svg		4	3	33	0	19	121	0	0	0	0.03200000151991844	0.5	0	0.1120000034570694	0	0	35	47.79999923706055	13	5.5	0.10999999940395355	0	14	0	0	0	0	0	79	0	24	10	0.28999999165534973	19	0.699999988079071	24	0	26	12	0.9269999861717224	12	21	8	109	17	0	35	1	19	5	19	24	0.11999999731779099			
3	Abóbora cabotiá		https://s2-casaejardim.glbimg.com/dceQ0PD9qpjhKg9j5SXHyDP7BGc=/0x0:1400x933/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_a0b7e59562ef42049f4e191fe476fe7d/internal_photos/bs/2023/t/w/VYO1UJQJmPzyxE3YbaPQ/receitas-abobora-cabotia-como-fazer-freepik.jpg	0	48.04374313354492	0	10.760916709899902	0.7120000123977661	1.443750023841858	0.10000000149011612	0.20000000298023224	0.20000000298023224	0	0.7293333411216736	2.4626667499542236	0	0	0	f	/images/food/pumpkin.png	abóbora, abobora, abobra, jerimum, abobora cabotian, abóbora cabotian	4	0	0	0	0	0	0.07666666805744171	0	0	0	0	0	0.07000000029802322	0	0	0	7.4633331298828125	7.625666618347168	0	0.06133333221077919	0	0	0	0	0	0	0	0	0	0	0	0.3453333377838135	0	0	0	0	0	9.111000061035156	0.2606666684150696	0	0	32.595001220703125	199.1023406982422	0	0	0	1.4516667127609253	0	0	0	0	0.2863333225250244			
4	Abobrinha		https://images.unsplash.com/photo-1580294672673-4fbda48428be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80	0	17	0	3.109999895095825	0	1.2100000381469727	0.08399999886751175	0	0	0	0.3199999928474426	0	0	0	0	f	/images/food/zucchini.png	abobrinha, abobrinha italiana	4	10	63	0	51	147	0	0	0	0.09399999678134918	0.45100000500679016	0	0.16300000250339508	0	0	120	17.899999618530273	16	9.5	0.05299999937415123	0	12	0	0	0	0	0	129	0	46	26	0.3700000047683716	44	4.300000190734863	71	0	67	18	0.1770000010728836	18	43	38	261	37	0	49	8	29	10	32	54	0.3199999928474426			
5	Achocolatado em pó		https://amochocolate.net/wp-content/uploads/2019/12/Diferen%C3%A7a-entre-chocolate-em-p%C3%B3-e-achocolatado-1.jpg	0	368.5548095703125	0	94.44999694824219	1.375666618347168	0.7583333253860474	0	0	0	0	0.09200000017881393	0	0	0	0	f	/images/food/cocoa.png	achocoltado, achocolatado em pó, nescau	14	0	0	0	0	0	0	0	0	0.029999999329447746	0	0	0	0	0	0	0	126.52899932861328	0	0.17133332788944244	0	0	0	0	0	0	0	0	0	0	0	8.303667068481445	0	0	0	0	0	79.94666290283203	2.0260000228881836	0	0	38.15999984741211	521.6266479492188	0	0	0	25.20400047302246	0	0	0	0	0.4776666760444641			
6	Açúcar branco		https://udop.com.br/u_img/noticias/2020/acucar33.jpg	92	558.8763427734375	0	55.376834869384766	1.8053333759307861	7.412499904632568	14.100000381469727	9.300000190734863	3.200000047683716	15.501333236694336	34.191001892089844	2.4579999446868896	0	0	0	f	/images/food/sugar.svg	açúcar, açucar, açúcar refinado, açúcar branco, açucar refinado	14	36.1533317565918	0	0	0	0	0.03999999910593033	0	0	0.2433333396911621	1.3666666746139526	0	0	0	0	0	1.4199999570846558	171.232666015625	0	0.4519999921321869	0	0	0	0	0	0	0	0	0	0	0	1.4709999561309814	0	0	0	0	0	79.56600189208984	0.3636666536331177	0	0	302.5220031738281	430.9156799316406	0	0	0	64.05000305175781	0	0	0	0	1.3040000200271606			
7	Açúcar cristal		https://www.planusi.com.br/admin/public/img/thumb-precos-do-acucar-cristal-seguem-em-alta-no-spot-paulista-9773361543.png	0	386.5748291015625	0	99.54000091552734	0	0.3199999928474426	0	0	0	0	0	0	0	0	0	f	/images/food/sugar.svg	açúcar cristal, açucar cristal	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	3.5	0	0	0	0	0	0	0	0	0	0	0	0	0	0.1066666692495346	0	0	0	0	0	0.54666668176651	0	0	0	0	6.353333473205566	0	0	0	12.15999984741211	0	0	0	0	0			
8	Açúcar mascavo		https://superbeal.com.br/img/news/site_5d653235ca208.png	80	539.586669921875	0	59.57666778564453	1.6799999475479126	7.21999979019165	17.5	10	0.8999999761581421	16.517499923706055	30.266666412353516	2.1700000762939453	0	0	0	f	/images/food/sugar.svg	açúcar escuro, açúcar integral	14	0	0	0	0	0	0.05000000074505806	0	0	0.21666666865348816	0.6299999952316284	0	0.5899999737739563	0	0	0	0	191.19000244140625	2.299999952316284	0.31333333253860474	0	0	0	0	0	0	0	0	0	0	0	1.5766667127609253	0	0	0	0	0	57.099998474121094	0.30266666412353516	0	0	212.1133270263672	354.5133361816406	0	0	0	77.0999984741211	0	0	0	0	1.0633333921432495			
9	Água		https://images.unsplash.com/photo-1612392549274-9afb280ce7a9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	f	/images/food/water.svg		0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	3	0	0.009999999776482582	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	4	0	0	0	0	0.009999999776482582			
10	Água de coco		https://media.istockphoto.com/photos/coconut-drink-with-pulp-in-glass-on-wooden-table-picture-id526133774?b=1&k=20&m=526133774&s=170667a&w=0&h=0OifDfpyMrzYuy2fy-D-FRlucUJx2IjXJGK47vk4X7s=	0	33.514198303222656	0	8.65999984741211	0.06333333253860474	0.7200000286102295	0.17599999904632568	0	0	0	0.20000000298023224	0	0	0	0	f	/images/food/coconut-water.png	coco, agua de coco, água de coco	0	0	37	0	118	70	0	0	0	0.05700000002980232	0.07999999821186066	0	0.03200000151991844	0	0	0	2.4000000953674316	1.372333288192749	1.100000023841858	0.03999999910593033	0	14	0	0	0	0	0	165	0	34	17	0.28999999165534973	28	0	53	0	32	25	0.1420000046491623	13	37	16.67733383178711	0.9049999713897705	30	0	37	7.119333267211914	26	8	22	44	0.10000000149011612			
11	Água tônica	Refrigerante água tônica	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTPmrat6BsytvikRaNJtzOjhJYVqm3qDECfA&usqp=CAU	0	38.70000076293945	0	10	0.04333333298563957	0	0	0	0	0	0	0	0	0	0	f	/images/food/baking-soda.png	agua tonica, água tonica, tônica, tonica, água tônica, refrigerante tônico	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1.4076666831970215	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1.381333351135254	0	0	0	9.009666442871094	0	0	0	0	0			
12	Aipim		https://a-static.mlcdn.com.br/618x463/aipim/fruitexpress/1878daaecaf611eb86614201ac18500e/a80c447bae57a657277ef1e2516cb498.jpg	0	160	0	38.060001373291016	0	1.3600000143051147	0.07400000095367432	0	0	0	0.2800000011920929	0	0	0	0	f	/images/food/cassava.png	mandioca, macacheira, cassava	5	1	38	0	137	79	0	0	0	0.04800000041723251	0.8539999723434448	0	0.08799999952316284	0	0	8	20.600000381469727	16	23.700000762939453	0.10000000149011612	0	28	0	0	0	0	0	206	0	28	20	0.27000001072883606	27	1.899999976158142	39	0	44	21	0.3840000033378601	11	26	27	271	33	0	33	14	28	19	17	35	0.3400000035762787			
13	Alecrim		https://images.unsplash.com/photo-1603129624917-3c579e864025?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80	0	131	0	20.700000762939453	0	3.309999942779541	2.8380000591278076	0	0	0	5.860000133514404	0	0	0	0	f	/images/food/rosemary.png	alecrim, ramo de alecrim, ramos de alecrim	2	146	172	0	153	391	0	0	0	0.15199999511241913	0.9120000004768372	0	0.335999995470047	0	0	0	21.799999237060547	317	0	0.3009999990463257	0	37	0	0	0	0	0	361	0	159	66	6.650000095367432	136	0	249	0	143	91	0.9599999785423279	47	169	66	668	136	0	129	26	136	51	100	165	0.9300000071525574			
14	Aipo		https://www.cervejapetra.com.br/wp-content/uploads/2017/10/Sals%C3%A3o-min-945x486.jpg	0	19.09145736694336	0	4.272333145141602	1.0723333358764648	0.7583333253860474	0	0	0	0	0.0689999982714653	0.9570000171661377	0	0	0	f	/images/food/celery.png	aipo, salsão, salsa em ponto grande, talo de aipo, talo de salsão, talo de salsa em ponto grande	7	0	0	0	0	0	0	0	0	0	0	0	0.18000000715255737	0	0	0	5.880000114440918	65.22467041015625	0	0.31433331966400146	0	0	0	0	0	0	0	0	0	0	0	0.7203333377838135	0	0	0	0	0	8.860333442687988	0.17800000309944153	0	0	28.045665740966797	273.6036682128906	0	0	0	9.515666961669922	0	0	0	0	0.14266666769981384			
15	alface	Alface, roxa, crua	https://images.unsplash.com/photo-1622205313162-be1d5712a43f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80	0	15	0	2.869999885559082	0	1.3600000143051147	0.019999999552965164	0	0	0	0.15000000596046448	0	0	0	0	f	/images/food/lettuce.svg		2	370	56	0	71	142	0	0	0	0.07999999821186066	0.375	0	0.09000000357627869	0	0	4443	9.199999809265137	36	13.600000381469727	0.028999999165534973	0	16	0	0	0	0	0	182	0	57	22	0.8600000143051147	84	126.30000305175781	79	0	84	13	0.25	16	55	29	194	48	0	39	28	59	9	32	70	0.18000000715255737			
16	alho	Alho-poró, cru	https://images.unsplash.com/photo-1559454473-27bc85c67728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=617&q=80	0	149	0	33.060001373291016	0	6.360000133514404	0.08900000154972076	0	0	0	0.5	0	0	0	0	f	/images/food/garlic.svg		7	0	132	0	634	489	0	0	0	0.10999999940395355	0.699999988079071	0	1.2350000143051147	0	0	5	31.200000762939453	181	23.200000762939453	0.29899999499320984	0	65	0	0	0	0	0	805	0	200	113	1.7000000476837158	217	1.7000000476837158	308	0	273	25	1.6720000505447388	76	183	153	401	100	0	190	17	157	66	81	291	1.159999966621399			
17	Amêndoa		https://d3ugyf2ht6aenh.cloudfront.net/stores/798/671/products/amendoa-crua-111-74c26a793b14e338cb15407454214424-1024-1024.jpg	0	580.7469482421875	0	29.547239303588867	1.4676666259765625	18.554759979248047	4.800000190734863	32.29999923706055	16.200000762939453	0	47.32433319091797	11.640000343322754	0	0	0	f	/images/food/almond.png	amêndoa, amêndoas, amêndoa com pele, amêndoas com pele	1	0	0	0	0	0	0.28999999165534973	0	0	0.16333332657814026	0	0	0	0	0	0	0	236.70433044433594	0	0.9319999814033508	0	0	0	0	0	0	0	0	0	0	0	3.05566668510437	0	0	0	0	0	222.0989990234375	1.9479999542236328	0	0	493.0566711425781	639.6019897460938	0	0	0	278.5226745605469	0	0	0	0	2.5766665935516357			
18	Amêndoa torrada e salgada		https://d3ugyf2ht6aenh.cloudfront.net/stores/798/671/products/amendoa-crua-111-74c26a793b14e338cb15407454214424-1024-1024.jpg	0	580.7469482421875	0	29.547239303588867	1.4676666259765625	18.554759979248047	4.800000190734863	32.29999923706055	16.200000762939453	0	47.32433319091797	11.640000343322754	0	0	0	f	/images/food/almond.png	amêndoa torrada, amêndoas torradas, amêndoa salgada, amêndoas salgadas, amêndoa torrada e salgada, amêndoas torrada e salgada	1	0	0	0	0	0	0.28999999165534973	0	0	0.16333332657814026	0	0	0	0	0	0	0	236.70433044433594	0	0.9319999814033508	0	0	0	0	0	0	0	0	0	0	0	3.05566668510437	0	0	0	0	0	222.0989990234375	1.9479999542236328	0	0	493.0566711425781	639.6019897460938	0	0	0	278.5226745605469	0	0	0	0	2.5766665935516357			
19	Amendoim		https://images.unsplash.com/photo-1604267437800-d89485144366?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1888&q=80	0	567.1229858398438	0	16.09600067138672	0	25.82200050354004	6.301000118255615	0	0	0	49.24700164794922	0	0	0	0	f	/images/food/peanut.png	amendoim, amendoins	5	0	1025.342041015625	0	3084.931884765625	3145.889892578125	0	0	0	0.13699999451637268	12.055000305175781	0	0.34200000762939453	0	0	0	0	91.98600006103516	52.465999603271484	1.1640000343322754	0	330.8219909667969	0	0	0	0	0	5389.72607421875	0	1554.1099853515625	652.0549926757812	4.589000225067139	906.8489990234375	0	1671.91796875	0	926.0269775390625	168.01400756835938	1.9179999828338623	317.12298583984375	1376.7120361328125	376.0270080566406	705	1137.6710205078125	0	1271.2330322265625	18.013999938964844	882.8770141601562	250	1049.31494140625	1082.1920166015625	3.2880001068115234			
20	Amido de milho		https://images.armazemcerealista.com.br/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/a/m/amido-de-milho---100g.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/corn-flour.svg	maizena	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
21	Arroz Branco		https://images.unsplash.com/photo-1568347355280-d33fdf77d42a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80	81	130	0	32	0	2.690000057220459	0.07699999958276749	0	0	0	0.2800000011920929	0	0	18	0	f	/images/food/rice.svg	arroz	1	0	156	0	224	253	0	0	0	0.013000000268220901	1.4759999513626099	0	0.09300000220537186	0	0	0	0	10	2.0999999046325684	0.0689999982714653	0	55	0	0	0	0	0	524	0	122	63	1.2000000476837158	116	0	222	0	97	12	0.47200000286102295	163	144	43	35	127	0	141	1	96	31	90	164	0.49000000953674316			
22	Arroz integral cozido		https://caldobom.com.br/uploads/receitas-com-sobra-de-arroz-integral-cc17a08874a25bb2bad16f8fd21db64f1588776452.jpg	0	123.5348892211914	0	25.809749603271484	0.46299999952316284	2.588249921798706	0.30000001192092896	0.4000000059604645	0.30000001192092896	0	1.000333309173584	2.749333381652832	0	0	0	f	/images/food/rice.svg	arroz integral, arroz integral cozido	5	0	0	0	0	0	0.07999999821186066	0	0	0	0	0	0.07999999821186066	0	0	0	0	5.203999996185303	0	0.02033333294093609	0	0	0	0	0	0	0	0	0	0	0	0.2619999945163727	0	0	0	0	0	58.70199966430664	0.6273333430290222	0	0	105.85299682617188	75.15166473388672	0	0	0	1.2446666955947876	0	0	0	0	0.6826666593551636			
23	Arroz integral cru		https://d3ugyf2ht6aenh.cloudfront.net/stores/328/703/products/arroz-integral-agulha-com-arroz-vermelho-21-e0c3694e87622d8a6d16457318623947-1024-1024.jpg	0	123.5348892211914	0	25.809749603271484	0.46299999952316284	2.588249921798706	0.30000001192092896	0.4000000059604645	0.30000001192092896	0	1.000333309173584	2.749333381652832	0	0	0	f	/images/food/rice.svg	arroz integral cru, farinha de arroz integral	5	0	0	0	0	0	0.07999999821186066	0	0	0	0	0	0.07999999821186066	0	0	0	0	5.203999996185303	0	0.02033333294093609	0	0	0	0	0	0	0	0	0	0	0	0.2619999945163727	0	0	0	0	0	58.70199966430664	0.6273333430290222	0	0	105.85299682617188	75.15166473388672	0	0	0	1.2446666955947876	0	0	0	0	0.6826666593551636			
24	Arroz doce, caramelizado com farofa		http://www.cookbookfritzefrida.com.br/assets/uploads/posts/710/g_thumb-whatsapp-image-2021-09-29-at-150825-8647128-6175614.jpeg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		arroz code, arroz doce caramelizado, arroz doce com farofa, arroz doce caramelizado com fafora	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
25	Arroz libanês com frango, coalhada e nozes		https://cdn.panelinha.com.br/receita/1469761200000-Arroz-libanes-com-frango-coalhada-e-nozes.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		arroz libanês, arroz libanes, arroz libanês com frango, arroz libanês com frango e coalhada, arroz libanês com frango e nozes	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
26	Aveia		https://images.unsplash.com/photo-1586810512929-6b8659fde098?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	393.82269287109375	0	66.6356430053711	1.8133333921432495	13.921026229858398	1.5399999618530273	3.1556665897369385	3.0163333415985107	0	8.49666690826416	9.130000114440918	0	0	0	f	/images/food/oats.svg	aveia em flocos, flocos de aveia, aveia em floco	8	0	124	0	167	302	0.5533333420753479	0	0	0.029999999329447746	4.46999979019165	0	0.004999999888241291	0	0	0	1.350000023841858	47.88999938964844	7.400000095367432	0.4399999976158142	0	97	0	0	0	0	0	623	0	147	54	4.446666717529297	116	0.30000001192092896	216	0	135	118.76233673095703	1.8946666717529297	46	142	153.39666748046875	336.3333435058594	96	0	151	4.62666654586792	96	40	101	160	2.630000114440918			
27	Azeite de oliva		https://veja.abril.com.br/wp-content/uploads/2017/06/azeite-023.jpg?quality=70&strip=info&resize=680,453	0	884	0	0	0	0	13.807999610900879	0	0	0	100	0	0	0	1	f	/images/food/olive-oil.svg	azeite, óleo de oliva, azeite de oliva extra virgem	6	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0.30000001192092896	0	0	0	0	0	0	0	0	0	0	0	0	0.5600000023841858	0	60.20000076293945	0	0	0	0	0	0	0	0	1	0	0	0	2	0	0	0	0	0			
28	Azeitona		https://images.unsplash.com/photo-1582042043408-de36ded9059b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80	0	116	0	6.039999961853027	0	0.8399999737739563	2.2790000438690186	0	0	0	10.899999618530273	0	0	0	0	f	/images/food/olive.png	azeitona, oliva, azeitonas	4	17	43	0	67	92	0	0	0	0	0.03700000047683716	0	0.008999999612569809	0	0	198	0.8999999761581421	88	10.300000190734863	0.25099998712539673	0	0	0	0	0	0	0	93	0	49	23	6.28000020980835	31	1.399999976158142	50	0	32	4	0.019999999552965164	12	29	3	8	40	0	31	735	26	0	23	38	0.2199999988079071			
29	Babaganouch		https://cdn.panelinha.com.br/receita/958532400000-Babaganouch.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		babaganouch, baba ghanoush, babaganuche, baba ganoush, babaganoush	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
30	Banana Mysore		https://www.mundoecologia.com.br/wp-content/gallery/banana-my/Banana-Mysore-2.jpg	87	89	0	12	0	0	0	0	0	0	0	0	0	6	0	f	/images/food/banana.svg		4	0	40	0	49	124	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	9	0	0	0	0	0	152	0	28	77	0	28	0	68	0	50	0	0	8	49	0	0	38	0	40	0	28	9	9	47	0			
31	Banana nanica		https://cdn.awsli.com.br/600x450/1693/1693441/produto/92535301/9f9c9fa2f7.jpg	70	89	0	28	0.8399999737739563	1.090000033378601	0.1120000034570694	0	0	0	0.33000001311302185	1.9466667175292969	0	14	0	f	/images/food/banana.svg	banana, banana nanica, bananas, bananas nanicax	4	3	40	25	49	124	0	0	0	0.0729999989271164	0.6650000214576721	0	0.367000013589859	0	0	26	8.699999809265137	5	9.800000190734863	0.07800000160932541	0	9	0	0	0	0	0	152	0	28	77	0.25999999046325684	28	0.5	68	0	50	27	0.27000001072883606	8	49	22	358	38	0	40	1	28	9	9	47	0.15000000596046448			
32	Banana Prata		https://images.unsplash.com/photo-1583485646409-f9feb9af2a67?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80	39	89	0	28	0	1.090000033378601	0.1120000034570694	0	0	0	0.33000001311302185	0	0	8	0	f	/images/food/banana.svg	banana	4	3	40	25	49	124	0	0	0	0.0729999989271164	0.6650000214576721	0	0.367000013589859	0	0	26	8.699999809265137	5	9.800000190734863	0.07800000160932541	0	9	0	0	0	0	0	152	0	38	77	0.25999999046325684	28	0.5	68	0	50	27	0.27000001072883606	8	49	22	358	28	0	40	1	28	9	9	47	0.15000000596046448			
33	Banha de porco		https://data.gessulli.com.br/file/2019/08/21/H102608-F00000-Q576-2000x0.jpeg	0	902	0	0	0	0	39	0	0	0	95	0	0	0	0	f	/images/food/pork.png	banha, banha de porco	6	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
34	Batata	batata inglesa cozida	https://images.unsplash.com/photo-1563012678-bdfec255931b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80	0	87	0	20.1299991607666	0	1.8700000047683716	0.026000000536441803	0	0	0	0.10000000149011612	0	0	0	0	f	/images/food/potato.svg	batatinha, batata inglesa	9	0	57	0	86	457	0	0	0	0.019999999552965164	1.4390000104904175	0	0.29899999499320984	0	0	2	13	5	13.5	0.18799999356269836	0	24	0	0	0	0	0	314	0	56	41	0.3100000023841858	76	2.200000047683716	112	0	114	22	0.1379999965429306	30	83	44	379	67	0	81	4	68	29	69	105	0.30000001192092896			
35	Batata Doce		https://images.unsplash.com/photo-1584699006710-3ad3b82fce7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80	0	86	0	20.1200008392334	0	1.5700000524520874	0.017999999225139618	0	0	0	0.05000000074505806	0	0	0	0	f	/images/food/sweet-potato.png	batata doce, batata-doce, batata doce cozida	9	709	77	7	55	382	0	0	0	0.061000000685453415	0.5569999814033508	0	0.20900000631809235	0	0	8509	2.4000000953674316	30	12.300000190734863	0.1509999930858612	0	22	0	0	0	0	0	155	0	63	31	0.6100000143051147	55	1.7999999523162842	92	0	66	25	0.257999986410141	29	89	47	337	52	0	88	55	83	31	34	86	0.30000001192092896			
36	Beringela		https://images.unsplash.com/photo-1613881553903-4543f5f2cac9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80	0	25	0	5.880000114440918	0	0.9800000190734863	0.03400000184774399	0	0	0	0.18000000715255737	0	0	0	0	f	/images/food/eggplant.png	berinjela, beringela, beringela crua	4	1	51	0	57	164	0	0	0	0.03700000047683716	0.6489999890327454	0	0.08399999886751175	0	0	14	2.200000047683716	9	6.900000095367432	0.08100000023841858	0	6	0	0	0	0	0	186	0	41	23	0.23000000417232513	45	3.5	64	0	47	14	0.23199999332427979	11	43	24	229	43	0	42	2	37	9	27	53	0.1599999964237213			
37	Beterraba		https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80	0	43	0	9.5600004196167	0	1.6100000143051147	0.027000000700354576	0	0	0	0.17000000178813934	0	0	0	0	f	/images/food/beetroot.png	beterraba, beterraba crua	9	2	60	0	42	116	0	0	0	0.03999999910593033	0.33399999141693115	0	0.06700000166893005	0	0	20	4.900000095367432	16	6	0.07500000298023224	0	19	0	0	0	0	0	428	0	31	21	0.800000011920929	48	0.20000000298023224	68	0	58	23	0.32899999618530273	18	46	40	325	42	0	59	78	47	19	38	56	0.3499999940395355			
38	Bicarbonato de sódio		https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/06/baking-soda-water-and-wooden-spoon-1296x728-1.jpg?h=1528	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/baking-soda.png	bicarbonato, bicarbonato de sódio	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	26667	0	0	0	0	0			
39	Biscoito de maizena		https://3.bp.blogspot.com/-TonRrjPIQss/XAWN49EDjuI/AAAAAAAANqE/oJEtizgTh3Q8nKYzxOUyNfBxPPyxFAaKQCLcBGAs/s1600/biscoito-de-maizena.jpg	0	442.81939697265625	0	75.23414611816406	1.5099999904632568	8.072522163391113	3.9000000953674316	3.700000047683716	2.200000047683716	0	11.966666221618652	2.0999999046325684	0	0	0	f	/images/food/biscuit.png	biscoito de maizena	5	0	0	0	0	0	1.0099999904632568	0	0	0.4166666567325592	3.9066667556762695	0	0.23000000417232513	0	0	0	6.2166666984558105	54.45000076293945	0	0.17000000178813934	0	0	0	0	0	0	0	0	0	0	0	1.7599999904632568	0	0	0	0	0	37.143333435058594	0.778333306312561	0	0	166.10333251953125	141.63999938964844	0	0	0	352.02667236328125	0	0	0	0	1.0299999713897705			
40	Biscoito recheado		https://www.mashed.com/img/gallery/oreo-just-hinted-at-a-new-flavor-and-fans-cant-stop-guessing/l-intro-1645649340.jpg	0	471.82476806640625	0	70.54944610595703	1.2866666316986084	6.397217273712158	6.199999809265137	6.599999904632568	1.7000000476837158	0	19.58333396911621	2.9566667079925537	0	0	0	f	/images/food/oreo.png	biscoito recheado, oreo, bolacha recheada, biscoito oreo	5	0	0	0	0	0	0.3166666626930237	0	0	0.3933333456516266	2.5233333110809326	0	0.4566666781902313	0	0	0	3.5266666412353516	27.229999542236328	0	0.273333340883255	0	0	0	0	0	0	0	0	0	0	0	2.2699999809265137	0	0	0	0	0	47.97666549682617	0.5879999995231628	0	0	139.4499969482422	232.39999389648438	0	0	0	239.1999969482422	0	0	0	0	0.9933333396911621			
41	Bolo de cenoura		https://d1uz88p17r663j.cloudfront.net/original/2b76e99abc4136ccf26008c1c387023f_Bolo-de-cenoura-com-cobertura-de-brigadeiro-receitas-nestle.jpg	67	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/carrot-cake.svg	bolo de cenoura com cobertura, bolo de cenoura	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
42	Bolo de laranja		https://cdn.panelinha.com.br/receita/1632405810503-bolo-laranja.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		bolo de laranja	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
43	Cacau em pó		https://images.unsplash.com/photo-1578269830911-6159f1aee3b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80	0	400	0	80	0	5.710000038146973	4.289999961853027	0	0	0	5.710000038146973	0	0	0	0	f	/images/food/cocoa.png	cacau, cacau em pó	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	229	0	0	0	0	0	0	0	0	0	0	0	0	0	4.110000133514404	0	0	0	0	0	0	0	0	0	0	0	0	0	0	314	0	0	0	0	0			
44	Cachaça		https://www.cachacariadosamigos.com.br/smart/modulos/blog/imagens/grande/quais-sao-as-caracteristicas-de-uma-cachaca-boa_60-45.jpg	0	40.72018814086914	0	3.317500114440918	0.11999999731779099	0.5625	0	0	0	0	0	0	0	0	0	f	/images/food/liquor.png	cachaça, aguardente, cachaça de cana, aguardente de cana	0	0	0	0	0	0	0	0	0	0	2.9166667461395264	0	0.1433333307504654	0	0	0	0	4.985000133514404	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	6.743666648864746	0.005333333276212215	0	0	19.002666473388672	29.46666717529297	0	0	0	4.23033332824707	0	0	0	0	0			
45	Café passado	Café infusão 10%.	https://loucodocafe.com.br/wp-content/uploads/2019/09/como-coar-cafe-02-e1568171389779-1280x720.jpg	0	65.34359741210938	0	18.150999069213867	0.12133333086967468	0.11999999731779099	0.0020000000949949026	0	0	0	0.019999999552965164	0.13633333146572113	0	0	0	f	/images/food/coffee.png	café, café passado, café de infusão, café de infusão 10%, café infusão	14	0	3	0	1	5	0	0	0	0.07599999755620956	0.19099999964237213	0	0.029999999329447746	0	0	0	2.779665946960449	9.083000183105469	2.5999999046325684	0.007000000216066837	0	2	0	0	0	0	0	20	0	4	2	0.7526666522026062	2	0.10000000149011612	5	0	1	11.973999977111816	0.20600000023841858	0	3	4.7786664962768555	17.972999572753906	4	0	1	2	1	0	2	3	0.05066666752099991			
179	Sal		https://acrediteounao.com/wp-content/uploads/2018/12/sal-de-cozinha-e1543846010596.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/salt.svg		14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	24	0	0.029999999329447746	0	0	0	0	0	0	0	0	0	0	0	0.33000001311302185	0	0	0	0	0	1	0.10000000149011612	0	0	0	8	0	0	0	38758	0	0	0	0	0.10000000149011612			
46	Café moído		https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=871&q=80	0	1	0	0	0	0.11999999731779099	0.0020000000949949026	0	0	0	0.019999999552965164	0	0	0	0	f	/images/food/coffee.png	grão de café, grãos de café, café moído	14	0	3	0	1	5	0	0	0	0.07599999755620956	0.19099999964237213	0	0.0010000000474974513	0	0	0	0	2	2.5999999046325684	0.0020000000949949026	0	2	0	0	0	0	0	20	0	4	2	0.009999999776482582	2	0.10000000149011612	5	0	1	3	0.023000000044703484	0	3	3	49	4	0	1	2	1	0	2	3	0.019999999552965164			
47	Caldo de cana		https://comeraprender.com.br/wp-content/uploads/2019/07/shutterstock_348902039-1-1200x675.jpg	0	1.3970599174499512	0	0.39133334159851074	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/lemon-juice.png	caldo de cana	0	0	0	0	0	0	1.2333333492279053	0	0	0.2266666740179062	0	0	0	0	0	0	0	1.930999994277954	0	0.006000000052154064	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0.8809999823570251	0.0063333334401249886	0	0	0.6510000228881836	9.928999900817871	0	0	0	0.625333309173584	0	0	0	0	0			
48	Caldo de Legumes		https://cdn.panelinha.com.br/receita/1339470000000-Caldo-caseiro-de-legumes.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		caldo de legume, caldo de legumes	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
49	Canela		https://images.unsplash.com/photo-1611256243212-48a03787ea01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1177&q=80	0	247	0	80.58999633789062	0	3.990000009536743	0.3449999988079071	0	0	0	1.2400000095367432	0	0	0	0	f	/images/food/cinnamon.png	canela, casca de canela, canela em pó, canela em casca	14	15	166	1	166	438	0	0	0	0.04100000113248825	1.3320000171661377	0	0.15800000727176666	0	0	112	3.799999952316284	1002	11	0.33899998664855957	0	58	0	0	0	0	0	370	0	195	117	8.319999694824219	146	31.200000762939453	253	15	243	60	17.465999603271484	78	146	64	431	419	0	195	10	136	49	136	224	1.8300000429153442			
50	carambola		https://s2.glbimg.com/oqkIn68SdYB-3esiOk0byUm9VL0=/620x455/e.glbimg.com/og/ed/f/original/2020/01/28/carambola.jpg	0	45.74089050292969	0	11.481499671936035	0.37466666102409363	0.8708333373069763	0	0	0	0	0.1770000010728836	2.0313334465026855	0	0	0	f	/images/food/star-fruit.png	carambola, carambolas	4	0	0	0	0	0	0.11666666716337204	0	0	0	0	0	0	0	0	0	60.86666488647461	4.788333415985107	0	0.07733333110809326	0	0	0	0	0	0	0	0	0	0	0	0.19833333790302277	0	0	0	0	0	7.361000061035156	0.1263333261013031	0	0	10.74899959564209	132.5763397216797	0	0	0	4.094666481018066	0	0	0	0	0.23999999463558197			
51	Cardamomo	O cardamomo é uma especiaria bastante versátil, podendo ser usado na forma natural em chás, como substituto do alho no refogado do arroz ou adicionado em doces como pudins e geleias. Também pode-se aromatizar pães, colocar no molho da carne e saladas de frutas, por exemplo.	https://a-static.mlcdn.com.br/618x463/cardamomo-verdadeiro-ou-cardamomo-verde-jardim-exotico/jardimexotico/4499408033/715cda1e07338ac245ed33643f8fc305.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/cardamom.png	cardamomo, cardamomos, baga de cardamomo	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
52	Caril	O caril ou curry é um nome dado a determinados pratos, cuja principal caraterística é ter um molho cozinhado com especiarias e outros ingredientes típicos da cozinha da Índia, da Tailândia e de outros países asiáticos.	https://media.istockphoto.com/photos/curry-powder-on-a-wooden-spoon-and-in-a-wooden-bowl-picture-id1271918149?b=1&k=20&m=1271918149&s=170667a&w=0&h=ICQNG-IxiJ-ExTpYkn87rW5qhN8Cu5tVHEwVnAsGZSs=	0	217	0	35.83000183105469	0	5.829999923706055	0.8299999833106995	0	0	0	5.829999923706055	0	0	0	0	f	/images/food/curry.png	caril, curry	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	17	0	0	0	0	0	0	0	0	0	0	0	0	0	0.6000000238418579	0	0	0	0	0	0	0	0	0	0	0	0	0	0	400	0	0	0	0	0			
53	Carne bovina		https://images.unsplash.com/photo-1588347785102-2944ba63d0c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	91.52884674072266	0	23.848115921020508	0.8399999737739563	1.3985507488250732	6	0	0	0	0.11666666716337204	1.9466667175292969	0	0	0	f	/images/food/beef.svg	carne, carne de gado, carne moída, bife, acém	10	0	0	0	0	0	0	0	0	0.019999999552965164	0	0	0.1433333307504654	0	0	0	5.860000133514404	3.4166667461395264	0	0.10333333164453506	0	0	0	0	0	0	0	0	0	0	0	0.3466666638851166	0	0	0	0	0	27.796667098999023	0.14000000059604645	0	0	26.719999313354492	376.4700012207031	0	0	0	72	0	0	0	0	0.17666666209697723			
54	Castanha-do-pará		https://www.sistersintravel.com/wp-content/uploads/2015/12/sisters-in-travel-curiosidade-castanha-do-par%C3%A1-720x485.jpg	0	642.9630737304688	0	15.078660011291504	3.4019999504089355	14.53633975982666	15.300000190734863	27.399999618530273	21	0	63.45899963378906	7.931000232696533	0	0	0	f	/images/food/brazil-nut.png	castanha, castanha do pará	1	0	0	0	0	0	0.3033333420753479	0	0	0	0	0	0.4399999976158142	0	0	0	0	146.336669921875	0	1.7883332967758179	0	0	0	0	0	0	0	0	0	0	0	2.309999942779541	0	0	0	0	0	365.1233215332031	1.1036666631698608	0	0	853.2833251953125	650.9940185546875	0	0	0	0.6539999842643738	0	0	0	0	4.219333171844482			
55	Cebola		https://images.unsplash.com/photo-1560087706-04151ac8da26?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80	0	40	0	9	0	1.100000023841858	0.041999999433755875	0	0	0	0.10000000149011612	1.7000000476837158	4.199999809265137	0	0	f	/images/food/onion.svg	cebola palito, cebolas palito, cebolete, cebola para conserva, cebolas para conserva	11	0	21	0	104	91	0	0	0	0.027000000700354576	0.11599999666213989	0	0.11999999731779099	0	0	1	7.400000095367432	23	6.099999904632568	0.039000000804662704	0	4	0	0	0	0	0	258	0	25	14	0.20999999344348907	14	0.4000000059604645	25	0	39	10	0.1289999932050705	2	25	29	146	12	0	21	4	21	14	14	21	0.17000000178813934			
56	Cebolinha		https://media.istockphoto.com/photos/fresh-chives-siniklav-or-frenk-sogani-on-wooden-surface-picture-id845638780?b=1&k=20&m=845638780&s=170667a&w=0&h=5akMDvDeooH-uLd8av-DOBB0d3j8wJEI_hzjfHuX5Ik=	0	30	0	4.349999904632568	0	3.2699999809265137	0.1459999978542328	0	0	0	0.7300000190734863	0	0	0	0	f	/images/food/chive.png	cebolinha, cebolinho, cebolinha-francesa, cebolinha francesa	2	218	148	0	237	303	0	0	0	0.11500000208616257	0.6470000147819519	0	0.1379999965429306	0	0	2612	58.099998474121094	92	5.199999809265137	0.15700000524520874	0	0	0	0	0	0	0	677	0	162	57	1.600000023841858	139	212.6999969482422	195	0	163	42	0.37299999594688416	36	105	58	296	216	0	148	3	128	37	95	145	0.5600000023841858			
57	Cebolas em conserva		https://www.sumerbol.com.br/uploads/images/2017/11/cebola-em-conserva-576-1510594360.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		cebola em conserva	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
58	Cenoura		https://images.unsplash.com/photo-1582515073490-39981397c445?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80	16	41	0	9.579999923706055	0	0.9300000071525574	0.03200000151991844	0	0	0	0.23999999463558197	0	0	0	0	f	/images/food/carrot.svg	cenoura ralada, cenouras raladas, pedaços de cenoura	9	835	113	3477	91	190	0	0	0	0.057999998331069946	0.9829999804496765	0	0.1379999965429306	0	0	8285	5.900000095367432	33	8.800000190734863	0.04500000178813934	0	83	0	0	0	0	0	366	0	47	40	0.30000001192092896	77	13.199999809265137	102	1	101	12	0.14300000667572021	20	61	35	320	54	0	54	69	191	12	43	69	0.23999999463558197			
59	Cenoura cozida		https://images.unsplash.com/photo-1556909172-89cf0b24ff02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80	38	41	0	9.579999923706055	0	0.9300000071525574	0.03200000151991844	0	0	0	0.23999999463558197	0	0	0	0	f	/images/food/carrot.svg		9	835	113	3477	91	190	0	0	0	0.057999998331069946	0.9829999804496765	0	0.1379999965429306	0	0	8285	5.900000095367432	33	8.800000190734863	0.04500000178813934	0	83	0	0	0	0	0	366	0	47	40	0.30000001192092896	77	13.199999809265137	102	1	101	12	0.14300000667572021	20	61	35	320	54	0	54	69	191	12	43	69	0.23999999463558197			
60	Cerveja pilsen		https://blog.todovino.com.br/wp-content/uploads/2020/01/cerveja-pilsen1.jpg	0	2.7307498455047607	0	0.6430000066757202	0	0	0	0	0	0	0.052000001072883606	0	0	0	0	f	/images/food/beer.svg	cerveja	0	0	0	0	0	0	0.8933333158493042	0	0	0	0	0	0	0	0	0	0	0.6446666717529297	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	2.0369999408721924	0.27399998903274536	0	0	0	5.336333274841309	0	0	0	0	0	0	0	0	0			
61	Chá de erva-doce	Chá de erva-doce(Pimpinella anisum), infusão 5%	https://diariodonordeste.verdesmares.com.br/image/contentid/policy:7.4537296:1625738451/erva-doce%201.jpeg?f=default&$p$f=bacd656	0	2.2479100227355957	0	0.6296666860580444	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/anise.png	chá de erva-doce, erva-doce, erva doce, anis-verde, anis verde, pimpinela-branca, pimpinela branca	0	0	0	0	0	0	3.113333225250244	0	0	0.4833333194255829	0	0	0	0	0	0	0	0.2523333430290222	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0.9559999704360962	0.08866667002439499	0	0	1.5113333463668823	13.437666893005371	0	0	0	0	0	0	0	0	0			
62	Chapati	Também conhecido como pão ázimo, pãozinho indiano ou pão sírio	https://cdn.panelinha.com.br/receita/1594316806337-chapati1.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		chapati, pão ázimo, pão azimo, pão sírio, pão indiano, pãozinho indiano, pãozinho sírio	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
63	Chocolate preto 45 - 59%		https://media.istockphoto.com/photos/dark-chocolate-bar-on-rustic-wood-table-picture-id463813283?b=1&k=20&m=463813283&s=170667a&w=0&h=x-SXgRiiAkH-ilp7dZPZUQWdq0V7-4jwDf4BK8PRd0M=	0	546	0	61.16999816894531	0	4.880000114440918	18.518999099731445	0	0	0	31.280000686645508	0	0	0	0	f	/images/food/chocolate.png	chocolate, achocolatado, chocolate em pó, chocolate ao leite	5	2	0	7	0	0	0	0	0.23000000417232513	0.05000000074505806	0.7250000238418579	0	0.041999999433755875	0	0	26	0	56	0	1.027999997138977	0	0	0	0	0	0	0	0	0	0	0	8.020000457763672	0	8.100000381469727	0	0	0	146	1.4190000295639038	0	0	206	559	0	0	0	24	0	0	0	0	2.009999990463257			
64	Chuchu		https://static1.conquistesuavida.com.br/articles/2/78/82/@/25512-o-chuchu-e-uma-fonte-poderosa-de-nutrien-640x400-3.jpg	0	23	0	4.550000190734863	0	1.5199999809265137	0	0	0	0	0	0	0	0	0	f	/images/food/chayote.png	chuchu, chuchu cru	4	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	7.300000190734863	30	0	0	0	0	0	0	0	0	0	0	0	0	0	0.550000011920929	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
65	Churrasco		https://img.itdg.com.br/tdg/images/blog/uploads/2021/08/Churrasco-barato.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		churrasco, churrasco de carne	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
66	Clara de ovo		https://areademulher.r7.com/wp-content/uploads/2020/07/clara-de-ovo-beneficios-modo-de-usar-para-quem-e-mais-indicado.jpg	0	59.43569564819336	0	0	0.6683333516120911	13.447916984558105	0	0	0	0	0.08900000154972076	0	0	0	0	f	/images/food/egg.svg	clara de ovo, clara de ovos, claras de ovo, claras de ovos	0	0	0	0	0	0	0	0	0	0.07999999821186066	0	0	0	0	0	0	0	6.23199987411499	0	0.02866666577756405	0	0	0	0	0	0	0	0	0	0	0	0.07866666465997696	0	0	0	0	0	11.006999969482422	0	0	0	15.427666664123535	145.87033081054688	0	0	0	180.5376739501953	0	0	0	0	0			
67	Coalhada fresca		https://img.cybercook.com.br/imagens/receitas/190/coalhada-seca.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		coalhada, coalhada fresca	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
68	Coalhada seca		https://img.cybercook.com.br/imagens/receitas/190/coalhada-seca.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		coalhada seca	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
69	Coco ralado		https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	42	1540	0	26.670000076293945	0	6.670000076293945	60	0	0	0	66.66999816894531	0	0	0	0	f	/images/food/coconut.svg	coco, côco, cocos, côcos	8	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	2.4000000953674316	0	0	0	0	0	0	0	0	0	0	0	0	0	0	33	0	0	0	0	0			
70	Coentro		https://s2.glbimg.com/2uv6Zz8Fr8j89rvJC1mZl8wGPdo=/smart/e.glbimg.com/og/ed/f/original/2020/10/27/coriandrum-sativum-coentro-aespeciarista-.jpg	0	23	0	3.6700000762939453	0	2.130000114440918	0.014000000432133675	0	0	0	0.5199999809265137	0	0	0	0	f	/images/food/coriander.png	coentro	2	337	0	36	0	0	0	0	0	0.16200000047683716	1.1139999628067017	0	0.14900000393390656	0	0	3930	27	67	12.800000190734863	0.22499999403953552	0	0	0	0	0	0	0	0	0	0	0	1.7699999809265137	0	310	0	0	0	26	0.4259999990463257	0	0	48	521	0	0	0	46	0	0	0	0	0.5			
71	Couve-flor		https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80	0	25	0	4.96999979019165	0	1.9199999570846558	0.12999999523162842	0	0	0	0.2800000011920929	0	0	0	0	f	/images/food/cauliflower.png	couve-flor, couve flor, couves-flor, couves-flores, couve-flores	7	0	116	0	86	177	0	0	0	0.05999999865889549	0.5070000290870667	0	0.18400000035762787	0	0	0	48.20000076293945	22	44.29999923706055	0.039000000804662704	0	20	0	0	0	0	0	257	0	71	56	0.41999998688697815	71	15.5	106	0	217	15	0.1550000011920929	20	65	44	299	71	0	86	30	76	20	51	125	0.27000001072883606			
72	Cravo da índia		https://images.unsplash.com/photo-1626609940603-1fc7556a94ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80	0	325	0	56	0	6.300000190734863	3.700000047683716	0	0	0	8.300000190734863	0	0	0	0	f	/images/food/clove.png	cravo, cravos, cravos da índia, cravo-da-índia	2	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	648.7000122070312	0	0	0	0	0	0	0	0	0	0	0	0	0	12	0	0	0	0	0	0	0	0	0	0	1018	0	0	0	0	0	0	0	0	0			
73	Cuca		https://cdn.panelinha.com.br/receita/1550859492306-cuca-banana.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/bread.svg		5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
74	Ervilha		https://media.istockphoto.com/photos/pea-protein-powder-and-snap-pea-portrait-picture-id1175572671?b=1&k=20&m=1175572671&s=170667a&w=0&h=EWO5nG741j6gFokkAljmYE6tkCyEvGZxMMjjJq3dJZc=	0	81	0	14.449999809265137	0	5.420000076293945	0.07100000232458115	0	0	0	0.4000000059604645	0	0	0	0	f	/images/food/pea.png	ervilha, ervilhas	1	38	240	21	428	496	0	0	0	0.13199999928474426	2.0899999141693115	0	0.16899999976158142	0	0	449	40	25	28.399999618530273	0.17599999904632568	0	32	0	0	0	0	0	741	0	184	107	1.4700000286102295	195	24.799999237060547	323	0	317	33	0.4099999964237213	82	200	108	244	173	0	181	5	203	37	114	235	1.2400000095367432			
90	Fubá		https://caldobom.com.br/uploads/2018/12/diferenca-entre-fuba-e-farinha-de-milho.jpg	0	379	0	75.86000061035156	0	10.34000015258789	0	0	0	0	5.170000076293945	0	0	0	0	f	/images/food/corn-flour.svg	farinha de milho	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	2.4800000190734863	0	0	0	0	0	0	0	0	0	0	0	0	0	0	34	0	0	0	0	0			
75	Esfirra	Esfirra ou esfiha é uma pequena torta assada originária da Síria e do Líbano, e encontrada em outros países do Oriente Médio, como a Jordânia, Palestina e Iraque, além do Brasil e Argentina, para onde foi levada por imigrantes sírios e libaneses e se tornou extremamente popular.	https://vocegastro.com.br/app/uploads/2021/10/como-fazer-esfirra-aberta.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		esfirra, esfirras, esfiha, esfihas	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
76	Espaguete		https://www.comidaereceitas.com.br/wp-content/uploads/2021/06/espaguete_bolonhesaa-780x430.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		espaguete, esparguete, macarronete, macarrão com molho	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
77	Estrogonofe de Carne		https://piracanjuba.com.br/content/receitas/cont/0000000056/rec056_1910.jpg	0	173.141357421875	0	2.975416660308838	1.062000036239624	15.03125	5.255666732788086	3.322000026702881	0.856333315372467	66.21600341796875	10.803000450134277	0	0	0	0	f	/images/food/stroganoff.png	strogonofe, estrogonofe	5	27.633333206176758	0	0	0	0	0.05999999865889549	0	0	0.05000000074505806	3.253333330154419	0	0	0	0	0	0	28.31800079345703	0	0.14033333957195282	0	0	0	0	0	0	0	0	0	0	0	2.699333429336548	0	0	0	0	0	21.511667251586914	0.03333333507180214	0	0	185.5709991455078	322.31365966796875	0	0	0	122.8479995727539	0	0	0	0	2.0413334369659424			
78	Estrogonofe de Frango		https://img.cybercook.com.br/imagens/receitas/644/strogonoff-de-frango-1-840x480.jpg?q=75	0	156.8061065673828	0	2.593916654586792	0.9993333220481873	17.55208396911621	3.691999912261963	2.239666700363159	1.0146666765213013	79.95933532714844	7.9623332023620605	0	0	0	0	f	/images/food/stroganoff.png	strogonofe, estrogonofe	5	28.22333335876465	0	0	0	0	0.07333333045244217	0	0	0.03999999910593033	3.366666555404663	0	0.029999999329447746	0	0	0	0	26.049333572387695	0	0.12333333492279053	0	0	0	0	0	0	0	0	0	0	0	1.5213333368301392	0	0	0	0	0	24.764333724975586	0.027666667476296425	0	0	195.1576690673828	307.0863342285156	0	0	0	99.45500183105469	0	0	0	0	0.5833333134651184			
79	Falafel		https://cdn.panelinha.com.br/receita/1544465565960-falafel.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		falafel, falafel de frito, falafel de grão-de-bico, falafel de fava	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
80	Farinha de aveia		https://cdn.awsli.com.br/600x450/757/757669/produto/41919778/2bbdd6f3f5.jpg	72	400	0	73.33000183105469	0	13.329999923706055	0	0	0	0	6.670000076293945	0	0	0	0	f	/images/food/oat-flour.svg	farelo de aveia	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	43	0	0	0	0	0	0	0	0	0	0	0	0	0	3.3299999237060547	0	0	0	0	0	0	0	0	0	0	357	0	0	0	0	0	0	0	0	0			
81	Farinha de mandioca		https://media.istockphoto.com/photos/cassava-flour-in-handmade-pot-natural-organic-flour-from-brazil-picture-id1300392101?b=1&k=20&m=1300392101&s=170667a&w=0&h=MubnvNFt5Cv_6aKakGNc3UCaGzGTGXHkO6DuPP50c8E=	0	371	0	88.56999969482422	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/cassava-flour.png	farinha de mandioca, farofa	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	57	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	303	0	0	0	0	0	0	0	0	0			
82	Farinha de rosca		https://img.itdg.com.br/tdg/images/blog/uploads/2017/09/shutterstock_170955137.jpg?w=1200	0	414.85052490234375	0	77.77086639404297	1.8633333444595337	11.879130363464355	3.299999952316284	1.399999976158142	0.6000000238418579	11.27180004119873	5.789999961853027	1.940000057220459	0	0	0	f	/images/food/wheat-flour.svg	farinha de rosca, farinha de pão, farinha de pães, pão ralado, pão seco moído	5	492.2466735839844	0	0	0	0	1.4299999475479126	0	0	1.1333333253860474	9.5	0	1.1366666555404663	0	0	0	24.309999465942383	196.06333923339844	0	0.19333332777023315	0	0	0	0	0	0	0	0	0	0	0	8.723333358764648	0	0	0	0	0	57.686668395996094	1.4889999628067017	0	0	296.4433288574219	365.60333251953125	0	0	0	125.07333374023438	0	0	0	0	1.7266666889190674			
83	Farinha de trigo		https://images.unsplash.com/photo-1627485937980-221c88ac04f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1062&q=80	85	364	0	76.30999755859375	0	10.329999923706055	0.1550000011920929	0	0	0	0.9800000190734863	0	0	0	0	f	/images/food/wheat-flour.svg	farinha branca, farinha	14	0	332	0	417	435	0	0	0	0.49399998784065247	5.9039998054504395	0	0.04399999976158142	0	0	1	0	15	0	0.14399999380111694	0	219	0	0	0	0	0	3479	0	371	230	4.639999866485596	357	0.30000001192092896	710	0	228	22	0.6819999814033508	183	520	108	107	1198	0	516	2	281	127	312	415	0.699999988079071			
84	Fermento		https://static1.casapraticaqualita.com.br/articles/0/21/30/@/2427-fermento-biologico-fresco-conhecido-com-article_content_img-3.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/yeast.svg		14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
85	Figo		https://conteudo.imguol.com.br/c/entretenimento/84/2021/03/15/figo-1615830295984_v2_615x300.jpg	0	41.44712448120117	0	10.245942115783691	0.44333332777023315	0.967391312122345	0	0	0	0	0.15666666626930237	1.7933332920074463	0	0	0	f	/images/food/fig.png	figo, figos, figo cru, figos cru	4	0	0	0	0	0	0.05000000074505806	0	0	0	0	0	0	0	0	0	0.7900000214576721	27.389999389648438	0	0.12999999523162842	0	0	0	0	0	0	0	0	0	0	0	0.20333333313465118	0	0	0	0	0	11.3100004196167	0.05999999865889549	0	0	14.569999694824219	174.4199981689453	0	0	0	0	0	0	0	0	0.09000000357627869			
86	Figo enlatado em calda		https://kemdistribuidora.com.br/wp-content/uploads/2015/09/figo-em-calda.bmp	0	184.3607177734375	0	50.33840560913086	0.18000000715255737	0.5615941882133484	0	0	0	0	0.15000000596046448	1.9766666889190674	0	0	0	f	/images/food/fig.png	figo em calda, figos em calda, figo enlatado, figos enlatados	4	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	5.243333339691162	32.61666488647461	0	0.25	0	0	0	0	0	0	0	0	0	0	0	0.503333330154419	0	0	0	0	0	6.849999904632568	0.16033333539962769	0	0	6.253333568572998	39.349998474121094	0	0	0	6.869999885559082	0	0	0	0	0.09000000357627869			
87	Folha de Louro		https://images.unsplash.com/photo-1612549225312-900aa64d56bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/leaf.png	folha de louro, folhas de louro, louro	2	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
88	Frango		https://images.unsplash.com/photo-1606728035253-49e8a23146de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80	0	157.0590057373047	0	0	0	32.058998107910156	1	0	0	0	3.234999895095825	0	0	0	0	f	/images/food/chicken.svg	galinha, peito de frango, coxa de frango, frango assado, frango desfiado, frango cozido	10	10	1871.7650146484375	0	2168.235107421875	3015.2939453125	0	0	0.17599999904632568	0.17599999904632568	9.470999717712402	0	0.9409999847412109	0	0	0	0	6	117	0.05900000035762787	0	335.8819885253906	1	0	0	0	0	4748.82421875	0	1418.823974609375	1195.2939453125	0.47099998593330383	1572.9410400390625	4.294000148773193	2651.764892578125	0	3082.94091796875	32	0	834.1179809570312	1294.1180419921875	241	343	1018.823974609375	0	1221.7650146484375	47	1438.2349853515625	404.1180114746094	1155.2939453125	1660	0.9409999847412109			
89	Frango assado		https://www.mexidodeideias.com.br/wp-content/uploads/2012/07/Farofa_Caipira1.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		frango assado, frango assado com farofa, frango recheado, frango assado com recheio, frango recheado assado, frango recheado assado com farofa, frango assado com recheio de farofa	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
91	Galinhada		https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=731&q=80	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/rice.svg	risoto de frango, arroz com galinha, arroz com frango	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
92	Gelo		https://images.unsplash.com/photo-1561365890-798858b32e0c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGljZSUyMGN1YmV8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/ice.png	gelo	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	3	0	0.009999999776482582	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1	0	0	0	0	0	0	0	0	4	0	0	0	0	0.009999999776482582			
93	Gema de ovo		https://static.clubedaanamariabraga.com.br/wp-content/uploads/2017/07/ovo-gema-636.jpg	0	322	0	3.5899999141693115	0	15.859999656677246	9.550999641418457	0	0	0	26.540000915527344	0	0	0	0	f	/images/food/egg-yolk.png	gema, gema de ovo, gemas, gemas de ovo, gema de ovos	6	381	836	38	1099	1550	0	0	1.9500000476837158	0.527999997138977	0.024000000208616257	0	0.3499999940395355	0	0	88	0	129	820.2000122070312	0.07699999958276749	0	264	218	0	0	0	0	1970	0	488	416	2.7300000190734863	866	0.699999988079071	1399	0	1217	5	0.054999999701976776	378	681	390	109	646	0	1326	48	687	177	678	949	2.299999952316284			
94	Gengibre		https://media.istockphoto.com/photos/ginger-root-and-ginger-powder-in-the-bowl-picture-id647402644?b=1&k=20&m=647402644&s=170667a&w=0&h=5lyuLq8qT16BelSweo6vprZzM62uDGZXdpPXdEDzqBc=	0	80	0	17.770000457763672	0	1.8200000524520874	0.2029999941587448	0	0	0	0.75	0	0	0	0	f	/images/food/ginger.png	gengibre, gengibre em pó	9	0	31	0	43	208	0	0	0	0.03400000184774399	0.75	0	0.1599999964237213	0	0	0	5	16	28.799999237060547	0.22599999606609344	0	8	0	0	0	0	0	162	0	43	30	0.6000000238418579	51	0.10000000149011612	74	0	57	43	0.2290000021457672	13	45	34	415	41	0	45	13	36	12	20	73	0.3400000035762787			
95	Gergelim	O gergelim, também conhecido como sésamo, é a semente de uma planta originária do Oriente, de nome científico Sesamum indicum. Além de deliciosas, as sementes de gergelim trazem muitos benefícios, como melhorar a saúde óssea, proteger contra radiação e prevenir câncer, hipertensão, diabetes e inflamação.	https://www.jasminealimentos.com/wp-content/uploads/2017/04/gergelim1.jpg	0	583.5466918945312	0	21.617666244506836	2.925666570663452	21.1646671295166	7.800000190734863	19.899999618530273	22.5	0	50.43266677856445	11.868332862854004	0	0	0	f	/images/food/sesame.png	gergelim, gergelins, semente de gergelim, farinha de gergelim, sésamo, sésamos, semente de sésamo, farinha de sésamo, tahine, taíne, tahin, tahini	1	0	0	0	0	0	0.9366666674613953	0	0	0	5.923333168029785	0	0.12999999523162842	0	0	0	0	825.4463500976562	0	1.5096666812896729	0	0	0	0	0	0	0	0	0	0	0	5.447666645050049	0	0	0	0	0	360.68865966796875	2.672666549682617	0	0	740.708984375	546.2860107421875	0	0	0	2.575000047683716	0	0	0	0	5.235000133514404			
96	Grão-de-bico		https://conteudo.imguol.com.br/c/entretenimento/94/2016/12/07/grao-de-bico-1481138396075_v2_450x337.jpg	0	354.702880859375	0	57.8841667175293	3.1666667461395264	21.22916603088379	0.8999999761581421	1.399999976158142	2.799999952316284	0	5.429999828338623	12.356666564941406	0	0	0	f	/images/food/chickpea.png	grão de bico, grãos de bico, grãos-de-bico	1	0	0	0	0	0	0.5199999809265137	0	0	0	0	0	0.753333330154419	0	0	0	0	114.35933685302734	0	0.6706666946411133	0	0	0	0	0	0	0	0	0	0	0	5.377666473388672	0	0	0	0	0	146.38699340820312	3.1566667556762695	0	0	342.3353271484375	1115.70166015625	0	0	0	5.193999767303467	0	0	0	0	3.190999984741211			
97	Guacamole		https://cdn.panelinha.com.br/receita/1513697612821-guacamole.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/guacamole.png	guacamole	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
98	Guandu		https://content.paodeacucar.com/wp-content/uploads/2019/08/o-que-%C3%A9-guandu-4.jpg	0	344.1336364746094	0	64.00041961669922	3.4539999961853027	18.964582443237305	0.6000000238418579	0.20000000298023224	0.8999999761581421	0	2.131999969482422	21.31366729736328	0	0	0	f	/images/food/peas.png	guandu, grãos de guandu, grão-de-guandu, grãos-de-guandu, ingá, inga, ingás, ingas	1	0	0	0	0	0	1.0633333921432495	0	0	0	2.693333387374878	0	0.07000000029802322	0	0	0	1.4666666984558105	129.33766174316406	0	0.5730000138282776	0	0	0	0	0	0	0	0	0	0	0	1.943333387374878	0	0	0	0	0	166	1.0156667232513428	0	0	269.1943359375	1214.797607421875	0	0	0	1.6169999837875366	0	0	0	0	2.0166666507720947			
99	Hashweh	arroz árabe	https://cdn.panelinha.com.br/receita/1531406282006-corte%20arroz.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		arroz árabe, hashweh, arroz marroquino, arroz árabe com carne, arroz árabe com carne moída, arroz árabe com especiarias, arroz árabe com carne moída e especiarias	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
100	Hortelã		https://images.unsplash.com/photo-1588908933351-eeb8cd4c4521?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/mint.png	hortelã, hortelãs, folha de hortelã, folhas de hortelã	2	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
101	Iogurte natural		https://images.unsplash.com/photo-1562114808-b4b33cf60f4f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80	0	61	0	4.659999847412109	0	3.4700000286102295	2.0959999561309814	0	0	0	3.25	0	0	0	0	f	/images/food/yoghurt.png	iogurte natural, iogurt, iogurte, yogurt, yogurte, yogourt, yogourte, iogourte, yoghurt, yoghurte, ioghurte	0	27	148	0	104	275	0	0	0.3700000047683716	0.1420000046491623	0.07500000298023224	0	0.03200000151991844	0	0	5	0.5	121	15.199999809265137	0.008999999612569809	0	32	2	0	0	0	0	679	0	84	86	0.05000000074505806	189	0.20000000298023224	350	0	311	12	0.004000000189989805	102	189	95	155	411	0	215	46	142	20	175	287	0.5899999737739563			
102	Isotônico		https://www.thespruceeats.com/thmb/0SFkKV13vXlNq4T_uq6IpmZUrAY=/2123x1415/filters:fill(auto,1)/106908888-58aefb225f9b58a3c9287cf3.jpg	0	25.613332748413086	0	6.4033331871032715	0.09000000357627869	0	0	0	0	0	0	0	0	0	0	f	/images/food/ricotta.png	isotônico, isotónica, bebida isotônica, bebida isotónica	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1.2333333492279053	0	0	0	0	0	0	0	0	0	0	0	0	0	0.6700000166893005	0	0	0	0	0	0	0	0	0	8.973333358764648	13.026666641235352	0	0	0	44.08333206176758	0	0	0	0	0			
103	Kiwi		https://images.unsplash.com/photo-1616684000067-36952fde56ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80	0	61.25	0	14.625	0	1.125	0	0	0	0	0.5	0	0	0	0	f	/images/food/kiwi.png	kiwi, kiwis, groselha chinesa	4	4	52.5	0	81.25	126.25	0	0	0	0	0.375	0	0.125	0	0	52	92.75	34	7.75	0.125	0	31.25	0	0	0	0	0	183.75	0	60	27.5	0.25	51.25	40.25	66.25	0	61.25	17	0.125	23.75	43.75	34	312	43.75	0	52.5	3	47.5	15	33.75	57.5	0.125			
104	Laranja		https://images.unsplash.com/photo-1549888834-3ec93abae044?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	43	0	0	14	0	0.9399999976158142	0.014999999664723873	0	0	0	0.11999999731779099	0	0	0	0	f	/images/food/orange.svg		4	11	50	11	65	114	0	0	0	0.03999999910593033	0.28200000524520874	0	0.05999999865889549	0	0	71	53.20000076293945	40	8.399999618530273	0.04500000178813934	0	10	0	0	0	0	0	94	0	94	18	0.10000000149011612	25	0	23	0	47	10	0.02500000037252903	20	31	14	181	46	0	32	0	15	9	16	40	0.07000000029802322			
105	Leite de coco		https://media.istockphoto.com/photos/coconut-vegan-milk-with-halves-of-nuts-over-brown-background-picture-id1304494306?b=1&k=20&m=1304494306&s=170667a&w=0&h=bLfsZbv8t6Oej_GXr3KPy7uLuETt_Yb_w6tNaLtlm3s=	0	197	0	2.809999942779541	0	2.0199999809265137	18.915000915527344	0	0	0	21.329999923706055	0	0	0	0	f	/images/food/coconut-milk.png	leite de coco	0	0	103	0	331	197	0	0	0	0	0.6370000243186951	0	0.02800000086426735	0	0	0	1	18	8.5	0.22300000488758087	0	40	0	0	0	0	0	462	0	96	46	3.299999952316284	79	0	150	0	89	46	0.7680000066757202	38	102	96	220	83	0	104	13	74	24	62	122	0.5600000023841858			
106	Leite de vaca		https://images.unsplash.com/photo-1608634960479-c70cf0c3dece?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80	0	61	0	4.800000190734863	0	3.1500000953674316	1.8650000095367432	0	0	0	3.25	0	0	0	1	f	/images/food/milk.svg	leite, leite de vaca	0	46	107	0	90	270	0	0	0.44999998807907104	0.16899999976158142	0.08900000154972076	0	0.035999998450279236	0	0	7	0	113	14.300000190734863	0.02500000037252903	0	19	51	0	0	0	0	708	0	62	95	0.029999999329447746	163	0.30000001192092896	299	0	264	10	0.004000000189989805	83	163	84	132	311	0	190	43	134	40	159	206	0.3700000047683716			
107	Lentilha cozida		https://d1uz88p17r663j.cloudfront.net/resized/7b01c063de9f3c6a8b7b786f54df253c_lentilhas-vinho-receitas-nestle_1200_600.jpg	0	92.63876342773438	0	16.302249908447266	0.6119999885559082	6.3104166984558105	0.10000000149011612	0.10000000149011612	0.30000001192092896	0	0.5246666669845581	7.862333297729492	0	0	0	f	/images/food/lentils.png	lentilha, lentilhas, lentilha cozida, lentilhas cozidas	1	0	0	0	0	0	0.029999999329447746	0	0	0	0	0	0	0	0	0	0	16.10099983215332	0	0.17466667294502258	0	0	0	0	0	0	0	0	0	0	0	1.4793332815170288	0	0	0	0	0	21.645999908447266	0.2853333353996277	0	0	103.73999786376953	219.90367126464844	0	0	0	1.1763333082199097	0	0	0	0	1.1306666135787964			
108	Lentilha crua		https://www.acasaencantada.com.br/wp-content/uploads/2019/09/lentilha.png	0	339.1412353515625	0	62.004493713378906	2.6066665649414062	23.15217399597168	0.10000000149011612	0.20000000298023224	0.4000000059604645	0	0.7699999809265137	16.93666648864746	0	0	0	f	/images/food/lentils.png	lentilha crua, farinha de lentilha, farinha de lentilhas	1	0	0	0	0	0	0.1133333370089531	0	0	0	5.073333263397217	0	0.4166666567325592	0	0	0	0	53.52333450317383	0	0.8333333134651184	0	0	0	0	0	0	0	0	0	0	0	7.046666622161865	0	0	0	0	0	93.52999877929688	1.0843333005905151	0	0	367.7366638183594	886.8833618164062	0	0	0	0	0	0	0	0	3.486666679382324			
109	Limão		https://minhasaude.proteste.org.br/wp-content/uploads/2020/10/lim%C3%B5es-970x472.jpg	0	29	0	9.319999694824219	0	1.100000023841858	0.039000000804662704	0	0	0	0.30000001192092896	0	0	0	0	f	/images/food/lemon.png	limão, limões	4	1	0	1	0	0	0	0	0	0.019999999552965164	0.10000000149011612	0	0.07999999821186066	0	0	3	53	26	5.099999904632568	0.03700000047683716	0	0	0	0	0	0	0	0	0	0	0	0.6000000238418579	0	0	0	0	0	8	0.029999999329447746	0	0	16	138	0	0	0	2	0	0	0	0	0.05999999865889549			
110	Linhaça		https://images.immediate.co.uk/production/volatile/sites/30/2020/02/linseed2-62e1099.jpg?quality=90&resize=556,505	0	495.0960998535156	0	43.312198638916016	3.6679999828338623	14.083867073059082	4.199999809265137	7.099999904632568	25.299999237060547	0	32.252933502197266	33.50266647338867	0	0	0	f	/images/food/linseed.svg	semente de linhaça	1	0	0	0	0	0	0.11666666716337204	0	0	0	0	0	0.13333334028720856	0	0	0	0	211.49766540527344	0	1.08733332157135	0	0	0	0	0	0	0	0	0	0	0	4.697000026702881	0	0	0	0	0	346.9223327636719	2.814333438873291	0	0	615.1820068359375	869.2869873046875	0	0	0	8.673333168029785	0	0	0	0	4.388333320617676			
111	Lombo de porco		https://media.istockphoto.com/photos/baked-pork-loin-with-whole-grain-mustard-picture-id693429828?b=1&k=20&m=693429828&s=170667a&w=0&h=LogyIFTqLo69l8rDzTlDGApXotSFYZDUDffvNl7-ZRc=	0	242	0	0	0	27.31999969482422	5.230000019073486	0	0	0	13.920000076293945	0	0	0	0	f	/images/food/chop.png	lombo, lombinho, lombo de porco, filé de porco, lombo suíno, filé suíno, filé mignon suíno	10	2	1603	0	1723	2512	0	0	0.699999988079071	0.32100000977516174	5.0370001792907715	0	0.46399998664855957	0	0	0	0.6000000238418579	19	93.9000015258789	0.0729999989271164	0	344	53	0	0	0	0	4215	0	1409	1067	0.8700000047683716	1260	0	2177	0	2446	28	0.008999999612569809	712	1086	246	423	1158	0	1128	62	1234	338	936	1473	2.390000104904175			
112	Macarrão fusilli		https://www.bonde.com.br/img/bondenews/2017/11/img_1_33_1117.jpg	0	371.12261962890625	0	77.94435119628906	0.5133333206176758	9.995652198791504	0	0	0	0	1.3033332824707031	2.926666736602783	0	0	0	f	/images/food/screw-pasta.png	massa, macarrão, massa parafuso, massa parafuso de trigo, macarrão parafuso, macarrão parafuso de trigo, macarrão fusilli, macarrão fusilli de trigo, massa fusilli, massa fusilli de trigo, massa fusili, massa fusili de trigo, macarrão fusili, macarrão fusili de trigo	5	0	0	0	0	0	0.17666666209697723	0	0	0.019999999552965164	3.566666603088379	0	0	0	0	0	0	17.299999237060547	0	0.15000000596046448	0	0	0	0	0	0	0	0	0	0	0	0.8799999952316284	0	0	0	0	0	27.690000534057617	0.528333306312561	0	0	99.80999755859375	147.05999755859375	0	0	0	7.170000076293945	0	0	0	0	0.7766666412353516			
113	Massa de pastel		https://i.panelinha.com.br/i1/64-bk-6977-massa-pastel1.webp	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		massa de	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
114	Maçã Fuji		https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80	25	52	0	14	0	0.25999999046325684	0.02800000086426735	0	0	0	0.17000000178813934	0	0	3	0	f	/images/food/apple.svg		4	3	11	0	6	70	0	0	0	0.026000000536441803	0.09099999815225601	0	0.04100000113248825	0	0	27	4.599999904632568	6	3.4000000953674316	0.027000000700354576	0	1	0	0	0	0	0	25	0	9	5	0.11999999731779099	6	2.200000047683716	13	0	12	5	0.03500000014901161	1	6	11	107	6	0	10	1	6	1	1	12	0.03999999910593033			
115	Maniçoba		https://i.pinimg.com/originals/aa/69/2b/aa692b1b67df3742efe2cf6e521068b3.jpg	0	134.222900390625	0	3.4193332195281982	1.527666687965393	9.958333015441895	2.8933334350585938	3.6760001182556152	1.6736667156219482	42.766334533691406	8.699333190917969	2.1600000858306885	0	0	0	f		maniçoba	5	0	0	0	0	0	0.04333333298563957	0	0	0.07000000029802322	2.5766665935516357	0	0.05000000074505806	0	0	0	0	65.98066711425781	0	0.15966667234897614	0	0	0	0	0	0	0	0	0	0	0	3.2153332233428955	0	0	0	0	0	23.652334213256836	0.5960000157356262	0	0	54.882667541503906	147.71266174316406	0	0	0	406.704345703125	0	0	0	0	2.0253334045410156			
116	Manga		https://media.istockphoto.com/photos/mangoes-composition-picture-id1272010307?b=1&k=20&m=1272010307&s=170667a&w=0&h=ZjJ85mpjAr__adYT7zqSdYEDi1XvWiqgtVLqNYIDtkw=	0	60	0	14.979999542236328	0	0.8199999928474426	0.09200000017881393	0	0	0	0.3799999952316284	0	0	0	0	f	/images/food/mango.png	manga, mangas	4	54	82	9	31	68	0	0	0	0.03799999877810478	0.6690000295639038	0	0.11900000274181366	0	0	640	36.400001525878906	11	7.599999904632568	0.11100000143051147	0	0	0	0	0	0	0	96	0	34	19	0.1599999964237213	29	4.199999809265137	50	3	66	10	0.06300000101327896	8	27	14	168	29	0	35	1	31	13	16	42	0.09000000357627869			
117	Manjericão		https://images.unsplash.com/photo-1538596313828-41d729090199?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80	0	23	0	2.6500000953674316	0	3.1500000953674316	0.04100000113248825	0	0	0	0.6399999856948853	0	0	0	0	f	/images/food/basil.png	manjericão	2	264	132	0	117	301	0	0	0	0.07599999755620956	0.9020000100135803	0	0.1550000011920929	0	0	3142	18	177	11.399999618530273	0.38499999046325684	0	28	0	0	0	0	0	277	0	122	51	3.1700000762939453	104	414.79998779296875	191	0	110	64	1.1480000019073486	36	130	56	295	104	0	99	4	104	39	77	127	0.8100000023841858			
118	Manteiga		https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	717	0	0.05999999865889549	0	0.8500000238418579	51.36800003051758	0	0	0	81.11000061035156	0	0	0	0	f	/images/food/butter.svg		6	684	29	0	31	64	0	0	0.17000000178813934	0.03400000184774399	0.041999999433755875	0	0.003000000026077032	0	0	158	0	24	18.799999237060547	0	0	8	0	0	0	0	0	178	0	18	23	0.019999999552965164	51	7	83	0	67	2	0	21	41	24	24	82	0	46	643	38	12	41	57	0.09000000357627869			
119	Manteiga de amendoim		https://images.unsplash.com/flagged/photo-1625402535207-953e03369f59?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	588	0	23.979999542236328	2.2186665534973145	21.93000030517578	9.519000053405762	17.200000762939453	16.200000762939453	0	49.540000915527344	8.03600025177002	0	0	1	f	/images/food/peanut-butter.svg		6	0	905	0	2734	3016	0	0	0	0.10499999672174454	13.15999984741211	0	0.5509999990463257	0	0	0	0	54	65.69999694824219	0.5709999799728394	0	226	0	0	0	0	0	5029	0	1419	550	2.1600000858306885	608	0	1527	0	672	179	1.3609999418258667	262	1187	335	592	1391	0	1463	476	518	228	819	773	2.6700000762939453			
120	Maracujá		https://media.istockphoto.com/photos/fresh-passion-fruit-on-wood-table-in-top-view-flat-lay-for-background-picture-id860079962?b=1&k=20&m=860079962&s=170667a&w=0&h=WjvMtFrnUVnXWtwMt8uDO3MwEyveM-WEOQT-pG_6Npg=	0	97	0	23.3799991607666	0	2.200000047683716	0.05900000035762787	0	0	0	0.699999988079071	0	0	0	0	f	/images/food/passion-fruit.png	maracujá	4	64	0	0	0	0	0	0	0	0.12999999523162842	1.5	0	0.10000000149011612	0	0	743	30	12	7.599999904632568	0.0860000029206276	0	0	0	0	0	0	0	0	0	0	0	1.600000023841858	0	0.699999988079071	0	0	0	29	0	0	0	68	348	0	0	0	28	0	0	0	0	0.10000000149011612			
121	Margarina		https://www.saudevitalidade.com/wp-content/uploads/2021/02/pao-com-margarina-cafe-da-manha-1571859727604_v2_1920x1146-800x445.jpg	0	719	0	0.8999999761581421	0	0.8999999761581421	16.700000762939453	0	0	0	80.5	0	0	0	0	f	/images/food/margarine.svg		6	819	29	0	31	65	0	0	0.10000000149011612	0.03700000047683716	0.023000000044703484	0	0.008999999612569809	0	0	610	0.20000000298023224	30	0	0	0	8	0	0	0	0	0	179	0	18	23	0	52	0	84	0	68	3	0	21	41	23	42	83	0	46	943	39	12	41	57	0			
122	Maria mole		https://www.oetker.com.br/Recipe/Recipes/oetker.com.br/br-pt/dessert/image-thumb__70800__RecipeDetailsLightBox/maria-mole.jpg	0	256.5781555175781	0	2.4324533939361572	2.0306665897369385	9.629547119140625	13.699999809265137	6.400000095367432	0.30000001192092896	73.66899871826172	23.44099998474121	0	0	0	0	f	/images/food/marshmallows.png	maria-mole, marshmallow, marximelo	12	194.586669921875	0	0	0	0	0	0	0	0.19066666066646576	0	0	0	0	0	0	0	259.4666748046875	0	0.04500000178813934	0	0	0	0	0	0	0	0	0	0	0	0.11500000208616257	0	0	0	0	0	11.62833309173584	0.015333333052694798	0	0	447.8803405761719	93.0643310546875	0	0	0	557.9246826171875	0	0	0	0	1.2769999504089355			
123	Massa gravatinha		https://dcom-prod.imgix.net/files/wp-content/uploads/2017/07/1499888237-frango-grelhado-com-brocolis-e-macarrao-gravatinha_616x462.jpg?w=1280&h=720&crop=focalpoint&fp-x=0.5&fp-y=0.1&fit=crop&auto=compress&q=75	0	108.42900085449219	0	18.466999053955078	0	4.176000118255615	0.5360000133514404	0	0	0	1.7619999647140503	0	0	0	0	f	/images/food/farfalle.png	massa gravatinha, gravatinha, massa, macarrão	5	20.07699966430664	116.09200286865234	0	129.5019989013672	181.99200439453125	0	0	0.03799999877810478	0.03799999877810478	2.184000015258789	0	0.11500000208616257	0	0	188.54400634765625	0.9959999918937683	40.49800109863281	10.267999649047852	0.07699999958276749	0	59.00400161743164	0.42100000381469727	0	0	0	0	1154.7889404296875	0	106.89700317382812	93.48699951171875	0.6129999756813049	150.5749969482422	7.050000190734863	285.8240051269531	6431.57080078125	0	18.621000289916992	0.23000000417232513	0	183.9080047607422	58.85100173950195	184.59800720214844	424.90399169921875	0	176.6280059814453	253.98500061035156	127.2030029296875	50.19200134277344	95.78500366210938	179.30999755859375	0.42100000381469727			
124	Mel		https://images.unsplash.com/photo-1573697610008-4c72b4e9508f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80	0	304	0	82	0	0	0	0	0	0	0	0.20000000298023224	82	0	0	f	/images/food/honey.png	mel, mel de abelha	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0.5	6	0	0	0	0	0	0	0	0	0	0	0	0	0	0.4000000059604645	0	0	0	0	0	2	0	0	0	0	52	0	0	0	4	0	0	0	0	0			
125	Mexerica		https://images.unsplash.com/photo-1564415900645-30612d54dd0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80	0	53	0	13.34000015258789	0	0.8100000023841858	0.039000000804662704	0	0	0	0.3100000023841858	0	0	0	0	f	/images/food/tangerine.png	mexerica, tangerina, bergamota, vergamota, laranja-mimosa, mandarina, fuxiqueira, poncã, manjerica, laranja-cravo, mimosa	4	34	28	101	68	129	0	0	0	0.035999998450279236	0.37599998712539673	0	0.07800000160932541	0	0	155	26.700000762939453	37	10.199999809265137	0.041999999433755875	0	2	0	0	0	0	0	61	0	19	11	0.15000000596046448	17	0	28	0	32	12	0.039000000804662704	2	18	20	166	74	0	33	2	16	2	15	21	0.07000000029802322			
126	Milho		https://images.unsplash.com/photo-1601171908052-92d5a595199b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1146&q=80	0	98	0	17.100000381469727	0	3.200000047683716	0.19699999690055847	0	0	0	2.4000000953674316	4.599999904632568	0	0	0	f	/images/food/corn.svg	milho verde	1	13	304	23	135	252	0	0	0	0.05700000002980232	1.6829999685287476	0	0.13899999856948853	0	0	66	5.5	3	29.100000381469727	0.04899999871850014	0	27	0	0	0	0	0	655	0	131	91	0.44999998807907104	133	0.4000000059604645	358	0	141	26	0.16699999570846558	69	155	77	218	301	0	158	1	133	23	126	191	0.6200000047683716			
127	Mistura para bolo		https://img.shoppub.io/w=1000,h=1000,q=80,f=auto/beirario/media/uploads/produtos/foto/bb4dcde9240cafile.png	0	418.6333312988281	0	84.71391296386719	2	6.159420490264893	2.0950000286102295	1.8901666402816772	0.8130000233650208	0	6.12666654586792	1.7033333778381348	0	0	0	f	/images/food/cake.svg	mistura para bolo, mistura pronta para bolo, mistura de bolo, mistura pronta	5	0	0	0	0	0	0.17666666209697723	0	0	0	1.5166666507720947	0	1.503333330154419	0	0	0	0	58.87900161743164	0	0.15333333611488342	0	0	0	0	0	0	0	0	0	0	0	1.2106666564941406	0	0	0	0	0	27.922000885009766	0.46266666054725647	0	0	332.65765380859375	75.36299896240234	0	0	0	462.8800048828125	0	0	0	0	0.5826666951179504			
128	Molho de Limão e Mel para Salada		https://cdn.panelinha.com.br/receita/1619447331360-molho%2011.07.16.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/sauce.png	molho de limão e mel para salada, molho de salada, molho para salada, molho pra   salada, molho de limão, molho de mel	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
129	Molho de tahine		https://cdn.panelinha.com.br/receita/1409799600000-Molho-de-tahine.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		molho de tahine	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
130	Molho de tomate		https://images.unsplash.com/photo-1472476443507-c7a5948772fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80	0	18	0	3.890000104904175	0	0.8799999952316284	0.02800000086426735	0	0	0	0.20000000298023224	0	0	0	1	f	/images/food/tomato-sauce.svg	molho de tomate, extrato, extrato de tomate	0	42	27	101	21	135	0	0	0	0.01899999938905239	0.593999981880188	0	0.07999999821186066	0	0	449	13.699999809265137	10	6.699999809265137	0.05900000035762787	0	9	0	0	0	0	0	431	0	19	14	0.27000001072883606	18	7.900000095367432	25	2573	27	11	0.11400000005960464	6	27	24	237	15	0	26	5	27	6	14	18	0.17000000178813934			
131	Morango		https://images.unsplash.com/photo-1591271300850-22d6784e0a7f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80	53	0	0	6	0	0.6700000166893005	0.014999999664723873	0	0	0	0.30000001192092896	0	0	2	0	f	/images/food/strawberry.svg	moranguinho	4	1	33	0	28	149	0	0	0	0.02199999988079071	0.38600000739097595	0	0.04699999839067459	0	0	7	58.79999923706055	16	5.699999809265137	0.04800000041723251	0	6	0	0	0	0	0	98	0	26	12	0.4099999964237213	16	2.200000047683716	34	0	26	13	0.38600000739097595	2	19	24	153	20	0	25	1	20	8	22	19	0.14000000059604645			
132	Semente de mostarda		https://media.swncdn.com/via/5884-istockgetty-images-plusrezkrr.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/mustard-seed.png	sementes de mostarda, mostarda em semente	1	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
133	Muhammara		https://cdn.panelinha.com.br/receita/1608246532491-Muhammara_receita.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		muhammara, pasta de pimentão, pasta de pimentão vermelho, muhamara, mhammara	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
134	Noz		https://images.unsplash.com/photo-1524593656068-fbac72624bb0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80	0	645.3740234375	0	17.753000259399414	0	15.946999549865723	6.388000011444092	0	0	0	61.849998474121094	0	0	0	0	f	/images/food/walnut.png	noz, nozes	1	3.128000020980835	732.5989990234375	0.13199999928474426	2129.074951171875	1793.3919677734375	0	0	0	0.30799999833106995	3.7890000343322754	0	0.4410000145435333	0	0	38.678001403808594	1.277999997138977	101.58599853515625	41.01300048828125	1.1449999809265137	0	220.26400756835938	0	0	0	0	0	3651.5419921875	0	881.93798828125	412.3349914550781	3.436000108718872	614.0969848632812	8.722000122070312	1140.0880126953125	0	538.3259887695312	174.88999938964844	3.74399995803833	218.9429931640625	811.4539794921875	378.4580078125	617.31298828125	721.14501953125	0	853.7440185546875	2.996000051498413	533.9210205078125	166.9600067138672	493.3919982910156	759.9119873046875	3.3480000495910645			
135	Noz-moscada		https://radioaratiba.com.br/wp-content/uploads/2018/06/noz-moscada-696x462.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/seasoning.png	noz-moscada, noz moscada, noz-moscadas, noz moscadas	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
136	Óleo de soja		https://img.ibxk.com.br/2020/01/22/22215352968302.jpg?w=1120&h=420&mode=crop&scale=both	0	884	0	0	0	0	15.649999618530273	0	0	0	100	0	0	0	1	f	/images/food/oil.svg	óleo	6	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0.20000000298023224	0	0	0	0	0	0	0	0	0	0	0	0	0.05000000074505806	0	183.89999389648438	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0.009999999776482582			
137	Orégano		https://www.blog.bioritmo.com.br/wp-content/uploads/2021/11/shutterstock_524219779-1.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/oregano.png		5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
138	Ovo cru		https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80	0	240.18722534179688	0	1.193666696548462	1.099666714668274	15.616666793823242	4.116333484649658	5.7270002365112305	4.913333415985107	516.263671875	18.592666625976562	0	0	0	0	f	/images/food/egg.svg	ovos, ovo, ovo de galinha, ovos de galinha, ovos de frango, ovo de frango	0	93.8933334350586	735	0	820	1329	0.06333333253860474	0	0.8899999856948853	0.3166666626930237	0.07500000298023224	0	0.17000000178813934	0	0	0	0	72.88733673095703	293.79998779296875	0.03866666555404663	0	272	82	0	0	0	0	1673	0	432	309	2.0966665744781494	671	0.30000001192092896	1086	0	912	16.250333786010742	0.03433333337306976	380	680	422.4106750488281	184.0070037841797	512	0	971	166.11233520507812	556	167	499	858	1.4613332748413086			
139	Ovo cozido		https://images.aws.nestle.recipes/resized/8431b78f563804dd482bdc3911f82dc1_ovo-cozido-receitas-nestle_1200_600.jpg	0	240.18722534179688	0	1.193666696548462	1.099666714668274	15.616666793823242	4.116333484649658	5.7270002365112305	4.913333415985107	516.263671875	18.592666625976562	0	0	0	0	f	/images/food/egg.svg	ovo cozido, ovo cozido de galinha	5	93.8933334350586	0	0	0	0	0.06333333253860474	0	0	0.3166666626930237	0	0	0	0	0	0	0	72.88733673095703	0	0.03866666555404663	0	0	0	0	0	0	0	0	0	0	0	2.0966665744781494	0	0	0	0	0	16.250333786010742	0.03433333337306976	0	0	422.4106750488281	184.0070037841797	0	0	0	166.11233520507812	0	0	0	0	1.4613332748413086			
140	Ovo de codorna cru		https://data.gessulli.com.br/file/2016/05/19/H101457-F00000-L189-1200x0.jpeg	0	352.67333984375	0	1.559999942779541	1.7403333187103271	15.899999618530273	9.199999809265137	12.100000381469727	4	1272.3719482421875	30.777000427246094	0	0	0	0	f	/images/food/egg.svg	ovo de codorna, ovo de codorna cru	0	148.47999572753906	0	0	0	0	0.18000000715255737	0	0	0.21666666865348816	0	0	0	0	0	0	0	114.43099975585938	0	0	0	0	0	0	0	0	0	0	0	0	0	2.9233334064483643	0	0	0	0	0	9.36733341217041	0.059333331882953644	0	0	385.74700927734375	87.37733459472656	0	0	0	44.908668518066406	0	0	0	0	2.873666763305664			
141	Ovo frito		https://cdn.panelinha.com.br/receita/1519158375914-ovo%20frito.jpg	0	386.8457336425781	0	99.61000061035156	0	0.3199999928474426	0	0	0	0	0	0	0	0	0	f	/images/food/egg.svg	ovo frito, ovos fritos	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	7.586666584014893	0	0	0	0	0	0	0	0	0	0	0	0	0	0.16333332657814026	0	0	0	0	0	1.006666660308838	0	0	0	0	2.559999942779541	0	0	0	0	0	0	0	0	0			
142	Pão caseiro		https://images.unsplash.com/photo-1537200275355-4f0c0714f777?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	274	0	47.540000915527344	0	10.670000076293945	0.6970000267028809	0	0	0	4.53000020980835	0	0	0	0	f	/images/food/bread.svg	pão, pãozinho, pão integral	12	0	0	0	0	0	0	0	0	0.25200000405311584	5.590000152587891	0	0.11100000143051147	0	0	1	0.20000000298023224	125	18.700000762939453	0.14800000190734863	0	0	0	0	0	0	0	0	0	0	0	3.5999999046325684	0	4.900000095367432	0	0	0	41	1.0260000228881836	0	0	129	141	0	0	0	473	0	0	0	0	1.0399999618530273			
143	Pão de Batata Doce		https://cdn.panelinha.com.br/receita/1544639354405-pa%CC%83o%20de%20batata-doce%20para%20trocar.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/bread.png	pão de batata doce, bolinho de batata, bolinho de batata doce, bolinho de batata-doce, pão de batata-doce	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
144	Pão de Ló		https://s2.glbimg.com/WoMudBfzWeMl0GzSwccmbkAOiW4=/0x0:5472x3648/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2021/8/N/inlAOzTDKABlgDpAoqlg/pao-de-lo-1-.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		pão de ló, pão-de-ló	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
145	Pão Francês		https://images.unsplash.com/photo-1580822642566-5138e95313d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	100	0	0	20	0	8.850000381469727	0.6980000138282776	0	0	0	3.3299999237060547	0	0	14	0	f	/images/food/bread-roll.svg		12	0	0	0	0	0	0	0	0	0.24300000071525574	4.78000020980835	0	0.08699999749660492	0	0	0	0	144	14.600000381469727	0.10100000351667404	0	0	0	0	0	0	0	0	0	0	0	3.609999895095825	0	0.20000000298023224	0	0	0	23	0.5360000133514404	0	0	98	126	0	0	0	490	0	0	0	0	0.7400000095367432			
146	Páprica		https://images.unsplash.com/photo-1575319026763-726d092c26c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80	0	282	0	53.9900016784668	0	14.140000343322754	2.140000104904175	0	0	0	12.890000343322754	0	0	0	0	f	/images/food/paprika.png	paprica, páprica doce, páprica picante	14	2463	640	595	890	2850	0	0	0	1.2300000190734863	10.0600004196167	0	2.1410000324249268	0	0	26162	0.8999999761581421	229	51.5	0.7129999995231628	0	230	0	0	0	0	0	2260	0	780	250	21.139999389648438	570	80.30000305175781	920	0	690	178	1.590000033378601	200	610	314	2280	2310	0	610	68	490	70	380	750	4.329999923706055			
147	Patinho		https://s.cornershopapp.com/product-images/2660452.jpg?versionId=BnVK8BbjHmNiGVF3YvP8nYkZs4fDnYIr	0	338.47314453125	0	0	0.7200000286102295	22.246665954589844	11.699999809265137	11.5	0.4000000059604645	99.54000091552734	26.99333381652832	0	0	0	0	f	/images/food/meat-steak.svg	patinho, carne moída, patinho moído, carne patinho, carne de patinho	10	0	0	0	0	0	0	0	0	0.30000001192092896	4.5366668701171875	0	0	0	0	0	0	4.026666641235352	0	0.0533333346247673	0	0	0	0	0	0	0	0	0	0	0	1.600000023841858	0	0	0	0	0	13.873332977294922	0	0	0	135.9600067138672	204.49000549316406	0	0	0	55.7066650390625	0	0	0	0	3.8933334350585938			
148	Patinho grelhado		https://www.kitano.com.br/wp-content/uploads/2019/07/SSP_2546-Contra-file%E2%95%A0%C3%BC-na-manteiga-e-alecrim.jpg	0	259.275634765625	0	0	0.8500000238418579	17.55666732788086	8.199999809265137	9.199999809265137	0.5	59.29999923706055	20.433332443237305	0	0	0	0	f	/images/food/meat-steak.svg	patinho grelhado, patinho assado, carne de patinho grelhado, carne de patinho assado, patinho assada, patinho assado	10	4.25	0	0	0	0	0.1066666692495346	0	0	0.06666667014360428	3.9100000858306885	0	0.029999999329447746	0	0	0	0	3.943333387374878	0	0.06400000303983688	0	0	0	0	0	0	0	0	0	0	0	1.309999942779541	0	0	0	0	0	15.323333740234375	0	0	0	124.36333465576172	241.40333557128906	0	0	0	63.76333236694336	0	0	0	0	2.630000114440918			
149	pastel	pastel de frango, frito	https://s2.glbimg.com/w5pW4yBkSibfdkhkDE-GGVYd21I=/0x0:1080x608/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2021/P/A/rfLBcEQhizbQPhwoBQew/capas-para-materias-gshow-home-2-.jpg	0	236	0	23.56999969482422	0	7.139999866485596	5	0	0	0	12.140000343322754	0	0	0	0	f	/images/food/pasty.svg		5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1.7000000476837158	14	0	0	0	0	0	0	0	0	0	0	0	0	0	3.2100000381469727	0	0	0	0	0	0	0	0	0	0	0	0	0	0	364	0	0	0	0	0			
150	Pavê de chocolate		https://cdn.panelinha.com.br/receita/1554734130093-_MGL7178.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		torta de bolacha, torta de bolacha maria, torta de biscoito, torta de biscoito maria, pavê de bolacha, pavê de bolacha maria, pavê de chocolate, pavê de biscoito, pavê de biscoito maria, pavê	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
151	Peito de peru defumado		https://i2.wp.com/files.agro20.com.br/uploads/2019/11/Peito-de-peru-1.jpg?resize=600%2C338&ssl=1	0	273	0	0	0	26.829999923706055	6.46999979019165	0	0	0	17.610000610351562	0	0	0	0	f	/images/food/ham.svg	peito de peru	10	3	1585	0	1717	2445	0	0	0.6800000071525574	0.31299999356269836	4.573999881744385	0	0.4020000100135803	0	0	0	0.30000001192092896	14	92.19999694824219	0.10000000149011612	0	333	33	0	0	0	0	4077	0	1493	1022	1.0099999904632568	1218	0	2122	0	2390	22	0.03200000151991844	687	1062	263	352	1198	0	1108	60	1198	324	903	1437	2.9600000381469727			
152	Pepino		https://s1.static.brasilescola.uol.com.br/be/2021/05/pepino.jpg	0	9.53369140625	0	2.0371015071868896	0.28999999165534973	0.8695651888847351	0	0	0	0	0	1.1200000047683716	0	0	0	f	/images/food/cucumber.png	pepino, pepinos	4	0	0	0	0	0	0	0	0	0.029999999329447746	0	0	0	0	0	0	4.986666679382324	9.616666793823242	0	0.036666665226221085	0	0	0	0	0	0	0	0	0	0	0	0.14666666090488434	0	0	0	0	0	9.34000015258789	0.0833333358168602	0	0	12.323333740234375	153.69332885742188	0	0	0	0	0	0	0	0	0.12666666507720947			
153	Pera		https://images.unsplash.com/photo-1562051725-cc35a65c8227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80	38	57	0	15.229999542236328	0	0.36000001430511475	0.02199999988079071	0	0	0	0.14000000059604645	0	0	0	0	f	/images/food/pear.svg	pêra, pera	4	1	14	1	10	105	0	0	0	0.026000000536441803	0.16099999845027924	0	0.028999999165534973	0	0	14	4.300000190734863	9	5.099999904632568	0.0820000022649765	0	2	0	0	0	0	0	30	0	13	2	0.18000000715255737	11	4.400000095367432	19	0	17	7	0.04800000041723251	2	11	12	116	21	0	15	1	11	2	2	17	0.10000000149011612			
154	Pernil de cordeiro		https://www.minervafoods.com/wp-content/uploads/2018/02/pernil_de_cordeiro_cru_-_blog.jpg	0	230	0	0	0	17.899999618530273	7.400000095367432	7	1.399999976158142	69	17.100000381469727	0	0	0	0	f	/images/food/ham.svg	cordeiro, carne de cordeiro, pernil de cordeiro, pernis de cordeiro, pernil de cordeiro cru, pernis de cordeiros cru, ovelha, carne de ovelha, pernil de ovelha, pernis de ovelha, pernil de ovelha cru, pernis de ovelhas cru	10	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
155	Peru de natal		https://cdn.panelinha.com.br/receita/1167789600000-Peru-assado.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		peru assado, peru de natal	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
156	Pimenta		https://images.unsplash.com/photo-1526179969422-e92255a5f223?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	333	0	66.66999816894531	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/pepper.svg		5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	21	437	0	0	0	0	0	0	0	0	0	0	0	0	0	28.899999618530273	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
157	Pimenta do Reino		http://premiertemperos.com.br/novo/wp-content/uploads/2020/04/1706-1-1200x675.jpg	0	251	0	63.95000076293945	0	10.390000343322754	1.3919999599456787	0	0	0	3.259999990463257	0	0	0	0	f	/images/food/black-pepper.png	pimenta do reino, pimenta preta, pimenta	14	27	616	12	308	1413	0	0	0	0.18000000715255737	1.1430000066757202	0	0.29100000858306885	0	0	310	0	443	11.300000190734863	1.3300000429153442	0	138	0	0	0	0	0	1413	0	441	159	9.710000038146973	366	163.6999969482422	1014	20	244	171	12.753000259399414	96	446	158	1329	1413	0	409	20	244	58	483	547	1.190000057220459			
158	Pimentão amarelo		https://agrodomingues.com.br/wp-content/uploads/2020/10/paprika-yellow-vegetables-318208.jpg	0	23.28136444091797	0	5.466811656951904	0.44333332777023315	1.0398551225662231	0	0	0	0	0.14666666090488434	1.59333336353302	0	0	0	f	/images/food/paprika.png	pimentão amarelo, pimentões amarelos, pimentões amarelo	4	0	0	0	0	0	0.046666666865348816	0	0	0.05666666850447655	0	0	0.019999999552965164	0	0	0	158.2100067138672	6.369999885559082	0	0.04333333298563957	0	0	0	0	0	0	0	0	0	0	0	0.3333333432674408	0	0	0	0	0	11.130000114440918	0.06333333253860474	0	0	19.959999084472656	210.9166717529297	0	0	0	0	0	0	0	0	0.15333333611488342			
159	Pimentão verde		https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkxpDwz0UbKAHT7Yp0Qfo_37-sxuk50wlBw&usqp=CAU	0	351.22674560546875	0	86.77333068847656	0.1733333319425583	0.4300000071525574	0	0	0	0	0	0.23666666448116302	0	0	0	f	/images/food/paprika.png	pimentão, pimentão verde, pimentões verdes, pimentões	4	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	27.413333892822266	0	0	0	0	0	0	0	0	0	0	0	0	0	0.5099999904632568	0	0	0	0	0	4.099999904632568	0.08766666799783707	0	0	8.380000114440918	37.63333511352539	0	0	0	1.5766667127609253	0	0	0	0	0			
160	Pimentão vermelho		https://cdn.awsli.com.br/800x800/998/998380/produto/36868381/1c91e001cd.jpg	0	29.93926239013672	0	6.3739166259765625	0.8330000042915344	1.9187500476837158	0	0	0	0	0.29899999499320984	4.553333282470703	0	0	0	f	/images/food/paprika.png	pimentão vermelho, pimentões vermelhos, pimentões vermelho	4	0	0	0	0	0	0.10333333164453506	0	0	0	0	0	0.029999999329447746	0	0	0	5.5966668128967285	112.15966796875	0	0.1666666716337204	0	0	0	0	0	0	0	0	0	0	0	0.36899998784065247	0	0	0	0	0	49.96900177001953	0.46399998664855957	0	0	55.82500076293945	248.80433654785156	0	0	0	0.890999972820282	0	0	0	0	0.5889999866485596			
161	Polenta		https://t2.rg.ltmcdn.com/pt/images/4/9/1/polenta_mole_194_600.jpg	74	0	0	21	1.3533333539962769	1.2300000190734863	0.05999999865889549	0	0	0	0.38999998569488525	2.4033334255218506	0	11	0	f	/images/food/polenta.svg		5	0	107	0	71	99	0.04333333298563957	0	0	0.057999998331069946	0.7620000243186951	0	0.03500000014901161	0	0	0	0	1	2.4000000953674316	0.04399999976158142	0	26	0	0	0	0	0	268	0	59	44	0.5699999928474426	51	0	175	0	40	5	0.03700000047683716	30	70	14	22	125	0	68	2	54	10	58	72	0.14000000059604645			
162	Presunto	Presunto, sem capa de gordura	https://images.unsplash.com/photo-1524438418049-ab2acb7aa48f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80	0	273	0	0	0	26.829999923706055	6.46999979019165	0	0	0	17.610000610351562	0	0	0	0	f	/images/food/ham.svg		10	3	1585	0	1717	2445	0	0	0.6800000071525574	0.31299999356269836	4.573999881744385	0	0.4020000100135803	0	0	0	0.30000001192092896	14	92.19999694824219	0.10000000149011612	0	333	33	0	0	0	0	4077	0	1493	1022	1.0099999904632568	1218	0	2122	0	2390	22	0.03200000151991844	687	1062	263	352	1198	0	1108	60	1198	324	903	1437	2.9600000381469727			
176	Repolho		https://assets.clevelandclinic.org/transform/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg	0	78.23472595214844	0	10.133166313171387	0.42233332991600037	6.7791666984558105	0.46299999952316284	0.4716666638851166	0.09733333438634872	21.342666625976562	1.1166666746139526	1.4600000381469727	0	0	0	f	/images/food/cabbage.png	repolho, cabeça de repolho	2	0	0	0	0	0	0.029999999329447746	0	0	0	0.3199999928474426	0	0	0	0	0	4.773333549499512	22.887332916259766	0	1.4466667175292969	0	0	0	0	0	0	0	0	0	0	0	0.8619999885559082	0	0	0	0	0	13.45966625213623	0.21966665983200073	0	0	67.88566589355469	184.03366088867188	0	0	0	12.100666999816895	0	0	0	0	1.750333309173584			
177	Requeijão		https://images.unsplash.com/photo-1547920303-9befbe3decc7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80	0	350	0	5.519999980926514	0	6.150000095367432	20.21299934387207	0	0	0	34.439998626708984	0	0	0	0	f	/images/food/cream-cheese.svg		13	308	184	1	235	514	0	0	0.2199999988079071	0.23000000417232513	0.09099999815225601	0	0.0560000017285347	0	0	59	0	97	26.799999237060547	0.017999999225139618	0	42	0	0	0	0	0	1304	0	142	175	0.10999999940395355	324	2.0999999046325684	657	0	567	9	0.010999999940395355	191	291	107	132	665	0	374	314	233	69	303	395	0.5			
178	Romã		https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Pomegranate.jpg/1200px-Pomegranate.jpg	0	55.73899841308594	0	15.105833053588867	0.503333330154419	0.40416666865348816	0	0	0	0	0	0.4386666715145111	0	0	0	f	/images/food/pomegranate.png	romã, romãs	4	0	0	0	0	0	0.11833333224058151	0	0	0.16926667094230652	0	0	0.05000000074505806	0	0	0	8.123332977294922	4.754000186920166	0	0.18733333051204681	0	0	0	0	0	0	0	0	0	0	0	0.25699999928474426	0	0	0	0	0	12.70199966430664	0.13199999928474426	0	0	40.266998291015625	484.5706787109375	0	0	0	0.5913333296775818	0	0	0	0	0.6700000166893005			
163	Pudim	Seja de leite, de coco ou até de pão, uma das sobremesas que mais tem ligação com brasileiro é o pudim. Apesar de alguns indícios apontarem Portugal como seu berço, o pudim é um dos orgulhos e paixões nacionais. E é claro que este doce merecia um dia só dele: no dia 22 de Maio se comemora o Dia Nacional do Pudim.\n\nSe por um lado é praticamente incontestável o quão delicioso um pudim pode ser, em relação à sua origem, há várias dúvidas. Os portugueses afirmam ser os criadores do pudim, no século XVI, porém há controvérsias, pois historiadores afirmam que não tem como saber exatamente onde e nem quando esse doce foi inventado.\n\nOutra história conta que o pudim foi inventado por um abade português (cargo religioso acima do monge). Os relatos dão conta de que ele não divulgava a sua receita secreta para ninguém que ousasse perguntar. Com o sucesso do doce entre a população, ele pensou em fazer uma competição com outros confeiteiros, para ver se algum deles conseguia fazer o pudim perfeitamente.\n\nNo fim das contas, ninguém conseguiu fazer a receita exatamente igual, porém já tinham uma ideia de como chegar a algo relativamente próximo. A receita original só foi revelada após a morte do abade, quando seu caderno de receitas foi encontrado. Bem, se é lenda ou não, dificilmente saberemos.\n\nA primeira vez que se tem registro de uma receita de pudim no Brasil, foi no “O Cozinheiro Imperial”, primeiro livro de cozinha editado no País, de 1840. A receita era de pudim de nata. Porém, a forma atual da receita é preparada com leite condensado (mais à frente falaremos especificamente dele).\n\nO Dia Nacional do Pudim é comemorado em 22 de Maio. Porém, não há registros de quando, nem do porquê de a data ter sido criada. Em outros países, como nos Estados Unidos (que tem praticamente um dia para tudo), a iguaria também tem seu valor – como no dia 12/02, quando é celebrado o Dia Nacional do Pudim de Ameixa.\n	https://cdn.panelinha.com.br/receita/955076400000-Pudim-de-leite.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		pudim, pudim de leite, pudim de leite condensado	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
164	Queijo Edam		https://heavenly-holland.com/wp-content/uploads/2017/05/cheese10-768x512.jpg	0	357	0	1.4299999475479126	0	24.989999771118164	18.670000076293945	0	0	0	28.56999969482422	0	0	0	0	f	/images/food/cheese.svg	queijo edam	13	243	764	0	964	1747	0	0	1.5399999618530273	0.3889999985694885	0.0820000022649765	0	0.07599999755620956	0	0	11	0	731	15.399999618530273	0.035999998450279236	0	255	20	0	0	0	0	6150	0	486	1034	0.4399999976158142	1308	2.299999952316284	2570	0	2660	30	0.010999999940395355	721	1434	536	188	3251	0	1547	973	932	352	1457	1810	3.75			
165	Queijo muçarela		https://www.alimentosonline.com.br/fotos_artigos/6253/mussarela.jpg	0	329.8707275390625	0	3.049332857131958	3.7803332805633545	22.64900016784668	14.233333587646484	5.949999809265137	0.49666666984558105	79.5790023803711	25.183000564575195	0	0	0	0	f	/images/food/cheese.svg	queijo, queijo muçarela, muçarela, mozarela, mozzarella, queijo mozarela	13	109	0	0	0	0	0	0	0	0.20000000298023224	0	0	0	0	0	0	0	875.039306640625	0	0.08266666531562805	0	0	0	0	0	0	0	0	0	0	0	0.3059999942779541	0	0	0	0	0	23.573667526245117	0.028333334252238274	0	0	469.9983215332031	61.89433288574219	0	0	0	581.3569946289062	0	0	0	0	3.5220000743865967			
166	Queijo minas frescal		https://img.itdg.com.br/tdg/images/blog/uploads/2018/09/queijo-minas-frescal.jpg?w=1200	0	264.27313232421875	0	3.2403132915496826	3.0433332920074463	17.411020278930664	11.399999618530273	5.800000190734863	0.4000000059604645	61.996334075927734	20.180665969848633	0	0	0	0	f	/images/food/cheese.svg	queijo minas frescal, queijos minas frescal	13	160.5066680908203	0	0	0	0	0	0	0	0.2513333261013031	0	0	0	0	0	0	0	579.2533569335938	0	0	0	0	0	0	0	0	0	0	0	0	0	0.9309999942779541	0	0	0	0	0	6.883666515350342	0.015666667371988297	0	0	123.3096694946289	104.84666442871094	0	0	0	31.226333618164062	0	0	0	0	0.29233333468437195			
167	Queijo minas meia cura		https://a-static.mlcdn.com.br/618x463/queijo-minas-canastra-meia-cura-legitimo-aprox-1-1-kg-canastra-redondo/emporiosantos/64b02c56a37d11ebbdbe4201ac1850f5/b27b602ba98eee6be92600c23b35c8f0.jpg	0	320.7218322753906	0	3.5729596614837646	3.487333297729492	21.211374282836914	13.226666450500488	5.586666584014893	0.33666667342185974	76.29866790771484	24.610000610351562	0	0	0	0	f	/images/food/cheese.svg	queijo minas	13	111.33333587646484	0	0	0	0	0.029999999329447746	0	0	0.3233333230018616	0	0	0	0	0	0	0	695.9173583984375	0	0.06866666674613953	0	0	0	0	0	0	0	0	0	0	0	0.21899999678134918	0	0	0	0	0	27.07266616821289	0.02266666665673256	0	0	402.5323181152344	119.97733306884766	0	0	0	501.1656799316406	0	0	0	0	2.681999921798706			
168	Queijo parmesão		https://a-static.mlcdn.com.br/618x463/queijo-minas-canastra-meia-cura-legitimo-aprox-1-1-kg-canastra-redondo/emporiosantos/64b02c56a37d11ebbdbe4201ac1850f5/b27b602ba98eee6be92600c23b35c8f0.jpg	0	452.9637451171875	0	1.6607199907302856	8.009666442871094	35.553611755371094	19.700000762939453	8.699999809265137	0.4000000059604645	105.84400177001953	33.529335021972656	0	0	0	0	f	/images/food/cheese.svg	queijo minas	13	66.15333557128906	0	0	0	0	0	0	0	0.4416666626930237	0	0	0.23333333432674408	0	0	0	0	991.9676513671875	0	0.16866666078567505	0	0	0	0	0	0	0	0	0	0	0	0.5323333144187927	0	0	0	0	0	33.367332458496094	0.04833333194255829	0	0	744.6233520507812	96.23699951171875	0	0	0	1844.0810546875	0	0	0	0	4.358666896820068			
169	Queijo parmesão		https://a-static.mlcdn.com.br/618x463/queijo-minas-canastra-meia-cura-legitimo-aprox-1-1-kg-canastra-redondo/emporiosantos/64b02c56a37d11ebbdbe4201ac1850f5/b27b602ba98eee6be92600c23b35c8f0.jpg	0	303.0798034667969	0	5.676333427429199	3.109666585922241	9.357333183288574	15.899999618530273	7.300000190734863	0.4000000059604645	82.15666961669922	27.435333251953125	0	0	0	0	f	/images/food/cheese.svg	queijo minas	13	57.313331604003906	0	0	0	0	0	0	0	0.20000000298023224	0	0	0	0	0	0	0	323.2993469238281	0	0.04533333331346512	0	0	0	0	0	0	0	0	0	0	0	0.2653333246707916	0	0	0	0	0	16.001667022705078	0.013000000268220901	0	0	577.943359375	193.7209930419922	0	0	0	780.426025390625	0	0	0	0	1.3046666383743286			
170	Queijo petit suisse		https://storage.googleapis.com/imagens_videos_gou_cooking_prod/production/cooking/cropped_temp_32983750954cf8fe02e36d0.12560684_.jpg	0	121.10595703125	0	18.462007522583008	0.6980000138282776	5.786660194396973	1.600000023841858	0.800000011920929	0	12.06933307647705	2.8383333683013916	0	0	0	0	f	/images/food/yoghurt.png	queijo petit suisse, petit suisse, danone, danoninho	13	272.65667724609375	0	0	0	0	0.22333332896232605	0	0	0.2666666805744171	2.683333396911621	0	0.20999999344348907	0	0	0	0	730.9326782226562	0	0.014666666276752949	0	0	0	0	0	0	0	0	0	0	0	0.14100000262260437	0	0	0	0	0	26.5086669921875	0.023333333432674408	0	0	448.45867919921875	121.461669921875	0	0	0	412.468994140625	0	0	0	0	2.6633334159851074			
171	Queijo prato		https://www.casamissao.com.br/wp-content/uploads/2020/12/queijo-prato-fatiado.jpg	0	359.8804626464844	0	1.878572940826416	3.9089999198913574	22.661760330200195	16.286666870117188	6.776666641235352	0.5299999713897705	90.90233612060547	29.106332778930664	0	0	0	0	f	/images/food/cheese.svg	queijo prato	13	122.66666412353516	0	0	0	0	0	0	0	0.2199999988079071	0	0	0	0	0	0	0	939.9933471679688	0	0.09866666793823242	0	0	0	0	0	0	0	0	0	0	0	0.2800000011920929	0	0	0	0	0	28.273666381835938	0.03233333304524422	0	0	460.8386535644531	73.47166442871094	0	0	0	579.7739868164062	0	0	0	0	3.4616665840148926			
172	Quibe assado		https://cdn.panelinha.com.br/receita/1564765785453-quibe.jpg	0	253.83131408691406	0	12.337416648864746	3.010333299636841	14.889583587646484	4.577333450317383	5.025000095367432	4.998666763305664	37.77166748046875	15.798999786376953	0	0	0	0	f	/images/food/cake.svg	quibe assado	5	0	0	0	0	0	0.12333333492279053	0	0	0.10333333164453506	1.503333330154419	0	0	0	0	0	0	21.725666046142578	0	0.15800000727176666	0	0	0	0	0	0	0	0	0	0	0	1.9526666402816772	0	0	0	0	0	38.772666931152344	0.7200000286102295	0	0	165.83399963378906	322.46734619140625	0	0	0	835.8250122070312	0	0	0	0	2.7820000648498535			
173	Quibe frito		https://salgadosdesucesso.com.br/wp-content/uploads/2019/02/receita-de-quibe-frito-1200x900.jpg	0	592.5311889648438	0	0	0.3033333420753479	11.479166984558105	17.700000762939453	20.100000381469727	10.100000381469727	73.08366394042969	60.25666809082031	0	0	0	0	f	/images/food/quibe.png	quibe frito, quibe	5	0	0	0	0	0	0	0	0	0	5.099999904632568	0	0	0	0	0	0	2.385999917984009	0	0.11233333498239517	0	0	0	0	0	0	0	0	0	0	0	0.43933331966400146	0	0	0	0	0	3.568000078201294	0	0	0	35.358665466308594	57.56999969482422	0	0	0	49.586666107177734	0	0	0	0	0.21066667139530182			
174	Ricota		https://www.thespruceeats.com/thmb/0SFkKV13vXlNq4T_uq6IpmZUrAY=/2123x1415/filters:fill(auto,1)/106908888-58aefb225f9b58a3c9287cf3.jpg	0	139.73178100585938	0	3.7861666679382324	1.934000015258789	12.600500106811523	4.5	2.4000000953674316	0.20000000298023224	48.70333480834961	8.10866641998291	0	0	0	0	f	/images/food/ricotta.png	queijo ricota, ricotta	13	52.8466682434082	0	0	0	0	0	0	0	0.14666666090488434	0	0	0	0	0	0	0	253.23599243164062	0	0	0	0	0	0	0	0	0	0	0	0	0	0.1366666704416275	0	0	0	0	0	11.808666229248047	0	0	0	161.51866149902344	112.37833404541016	0	0	0	282.5790100097656	0	0	0	0	0.46033334732055664			
175	Rabanete		http://vamoscomermelhor.com.br/wp-content/uploads/2014/07/dsc00507-2.jpg	0	13.738125801086426	0	2.7253623008728027	0.746666669845581	1.39130437374115	0	0	0	0	0.07333333045244217	2.193333387374878	0	0	0	f	/images/food/radish.png	rabanete, rabanetes, rabanete vermelho, rabanete cru	9	0	0	0	0	0	0.05666666850447655	0	0	0.019999999552965164	0	0	0.03999999910593033	0	0	0	9.633333206176758	20.866666793823242	0	0.019999999552965164	0	0	0	0	0	0	0	0	0	0	0	0.3499999940395355	0	0	0	0	0	9.613333702087402	0.07000000029802322	0	0	24.983333587646484	327.6966552734375	0	0	0	10.993332862854004	0	0	0	0	0.18000000715255737			
180	Salada de macarrão com beringela e purê de beterraba		https://cdn.panelinha.com.br/receita/1461898800000-Salada-de-macarrao-com-berinjela-e-pure-de-beterraba.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		salada de beterraba, salada de beringela, salada de beterraba, purê de beterraba	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
181	Salpicão de frango		https://images.aws.nestle.recipes/resized/0716d60c3ce29bc173181d4277693339_salpicao-frango-tradicional-receitas-nestle_1200_600.jpg	0	147.86459350585938	0	4.568999767303467	1.1376667022705078	13.925000190734863	1.3389999866485596	2.0806667804718018	3.997666597366333	52.52366638183594	7.840666770935059	0.4099999964237213	0	0	0	f		salpicão, salpicão de frango	5	0	0	0	0	0	0.05000000074505806	0	0	0	1.4766666889190674	0	0	0	0	0	9.256667137145996	9.409000396728516	0	0.07766667008399963	0	0	0	0	0	0	0	0	0	0	0	0.31833332777023315	0	0	0	0	0	13.253999710083008	0.027000000700354576	0	0	102.58300018310547	148.96800231933594	0	0	0	248.34567260742188	0	0	0	0	0.39266666769981384			
182	Salsa		https://images.unsplash.com/photo-1535189487909-a262ad10c165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80	0	36	0	6.329999923706055	0	2.9700000286102295	0.13199999928474426	0	0	0	0.7900000214576721	0	0	0	0	f	/images/food/parsley.png	salsa, folha de salsa, folhas de salsa, folha de salsinha, folhas de salsinha, salsinha, temperinho, temperinho verde, tempero verde	2	421	195	0	122	294	0	0	0	0.09799999743700027	1.312999963760376	0	0.09000000357627869	0	0	5054	133	138	12.800000190734863	0.14900000393390656	0	14	0	0	0	0	0	249	0	145	61	6.199999809265137	118	1640	204	0	181	50	0.1599999964237213	42	145	58	554	213	0	136	56	122	45	82	172	1.0700000524520874			
183	Sanduíche		https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/sandwich.svg		5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
184	Semente de cominho		https://images.unsplash.com/photo-1601723897386-e5df0c749fb7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VtaW58ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60	0	375	0	44.2400016784668	0	17.809999465942383	1.534999966621399	0	0	0	22.270000457763672	0	0	0	0	f	/images/food/cumin-seed.png	cominho, sementes de cominho	1	64	0	0	0	0	0	0	0	0.3269999921321869	4.578999996185303	0	0.4350000023841858	0	0	762	7.699999809265137	931	24.700000762939453	0.8669999837875366	0	0	0	0	0	0	0	0	0	0	0	66.36000061035156	0	5.400000095367432	0	0	0	366	3.3329999446868896	0	0	499	1788	0	0	0	168	0	0	0	0	4.800000190734863			
185	Semolina		https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/semolina.jpg	0	360	0	73	0	13	0	0	0	0	0	3.9000000953674316	0	0	0	f	/images/food/couscous.png	semolina, semolina de trigo, sêmola, sêmola de trigo	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
186	Sopa de Couve-flor		https://cdn.panelinha.com.br/receita/1468292400000-Sopa-de-couve-flor-com-farofinha-de-pao.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/soup.svg	sopa de couve-flor, sopa de couve flor	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
187	Suco de Laranja		https://images.unsplash.com/photo-1614065612682-10dbc3db2b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=657&q=80	50	45	0	10.399999618530273	0	0.699999988079071	0.024000000208616257	0	0	0	0.20000000298023224	0	0	6	1	f	/images/food/orange-juice.svg		0	10	15	6	47	75	0	0	0	0.029999999329447746	0.4000000059604645	0	0.03999999910593033	0	0	33	50	11	6.199999809265137	0.04399999976158142	0	5	0	0	0	0	0	33	0	9	3	0.20000000298023224	8	0.10000000149011612	13	0	9	11	0.014000000432133675	3	9	17	200	44	0	13	1	8	2	4	11	0.05000000074505806			
188	Sushi		https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		sushi, sushi de salmão, suchi	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
189	Tabule		https://cdn.panelinha.com.br/receita/1565021106629-tabule.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		tabule, salada de triguinho, salada libanesa, salada de triguinho libanesa	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
190	Tomate		https://images.unsplash.com/photo-1561155713-50f2a38fde2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80	0	18	0	3.890000104904175	0	0.8999999761581421	0	0	0	0	0.20000000298023224	1.2000000476837158	2.5999999046325684	0	0	f	/images/food/tomato.svg	tomate	4	42	27	101	21	135	0	0	0	0.01899999938905239	0.593999981880188	0	0.07999999821186066	0	0	449	13.699999809265137	10	6.699999809265137	0.05900000035762787	0	9	0	0	0	0	0	431	0	19	14	0.27000001072883606	18	7.900000095367432	25	2573	27	11	0.11400000005960464	6	27	24	237	15	0	26	5	27	6	14	18	0.17000000178813934			
191	Tomilho		https://images.unsplash.com/photo-1606072104299-cdaab62c0a07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/thyme.png	tomilho, ramo de tomilho, ramos de tomilho	2	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	120	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
192	Toucinho		https://espetinhodesucesso.com.br/wp-content/uploads/2018/12/como-fazer-bacon-artesanal-1200x675.jpg	0	592.5311889648438	0	0	0.3033333420753479	11.479166984558105	17.700000762939453	20.100000381469727	10.100000381469727	73.08366394042969	60.25666809082031	0	0	0	0	f	/images/food/ham.svg	toucinho, toucinhos, bacon, bacon em cubos	10	0	0	0	0	0	0	0	0	0	5.099999904632568	0	0	0	0	0	0	2.385999917984009	0	0.11233333498239517	0	0	0	0	0	0	0	0	0	0	0	0.43933331966400146	0	0	0	0	0	3.568000078201294	0	0	0	35.358665466308594	57.56999969482422	0	0	0	49.586666107177734	0	0	0	0	0.21066667139530182			
193	Urucum		https://www.dicasdemulher.com.br/wp-content/uploads/2020/03/urucum-0.png	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f	/images/food/seasoning.png	falso-açafrão, colorau	14	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
194	Uva		https://images.unsplash.com/photo-1525286102393-8bf945cd0649?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2074&q=80	0	67	0	17.149999618530273	0	0.6299999952316284	0.11400000005960464	0	0	0	0.3499999940395355	0	0	0	0	f	/images/food/grape.png	uva	4	5	26	1	46	77	0	0	0	0.05700000002980232	0.30000001192092896	0	0.10999999940395355	0	0	59	4	14	5.599999904632568	0.03999999910593033	0	10	0	0	0	0	0	131	0	19	23	0.28999999165534973	5	14.600000381469727	13	0	14	5	0.7179999947547913	21	13	10	191	21	0	30	2	17	3	11	17	0.03999999910593033			
195	Vinagre de vinho tinto		data:image/jpeg;base64,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	0	19	0	0.27000001072883606	0	0.03999999910593033	0	0	0	0	0	0	0	0	0	f	/images/food/red-wine-vinegar.png	vinagre, vinagre de vinho, vinagre de vinho tinto	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0.5	6	0	0.009999999776482582	0	0	0	0	0	0	0	0	0	0	0	0.44999998807907104	0	0	0	0	0	4	0.04600000008940697	0	0	8	39	0	0	0	8	0	0	0	0	0.029999999329447746			
196	Rodelas de abobrinha crocantes com parmesão		https://panelinha-sitenovo.s3.sa-east-1.amazonaws.com/receita/1632429758157-CP2021-12-05_0474.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		rodelas de abobrinha, abobrinha assada, abobrinha com parmesão	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
197	Arroz carreteiro		https://panelinha-sitenovo.s3.sa-east-1.amazonaws.com/receita/1633350306253-Panelinha_03_09_21_319.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		risoto, carreteiro, arroz com carne	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
198	Sopa de cenoura com curry		https://cdn.panelinha.com.br/receita/1491332195377-300541.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		sopa de copo, sopa de cenoura, sopa de curry	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
199	Cuscuz marroquino com filé mignon suíno		https://cdn.panelinha.com.br/receita/1480557600000-Cuscuz-marroquino-com-file-mignon-suino.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		cuscuz marroquino, cuscuz com carne, cuscuz marroquino com porco, cuscuz com porco	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
200	Geleia de manga e maracujá		https://cdn.panelinha.com.br/receita/1540583468204-receita-geleiaaaaa.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		geleia de manga, geleia de maracujá, geleia, geléia	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
201	Vinagrete de chuchu com cominho		https://cdn.panelinha.com.br/receita/1584364750707-vinagrete-de-chuchu.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		vinagrete de chuchu, vinagrete, vinagrete com cominho	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
202	Brownie cremoso de castanha-do-pará		https://cdn.panelinha.com.br/receita/1472612400000-Brownie-cremoso-de-castanha-do-para.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		brownie, brownie de castanha, brownie com castanha, brownie cremoso	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
203	Filé de frango grelhado com páprica e erva-doce		https://cdn.panelinha.com.br/receita/1612811291559-FRANGO-GRELHADO.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		filé de frango frango, frango grelhado, frango grelhado com páprica, frango grelhado com páprica e erva-doce	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
204	Clotted cream		https://cdn.panelinha.com.br/receita/1632170181467-clotted-cream.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		clotted cream, clotted cream caseiro	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
205	Café de prensa		https://cdn.panelinha.com.br/receita/1544023469159-cafe%CC%81%20prensa.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		café prensado, café de prensa, café	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
206	Torta de banana		https://cdn.panelinha.com.br/receita/1597953473440-tortareceita.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		torta, torta de banana	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
207	Suco refrescante de melão		https://cdn.panelinha.com.br/receita/1445306400000-Suco-refrescante-de-melao.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		suco, suco de melão, suco refrescante	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
208	Sanduíche de atum		https://cdn.panelinha.com.br/receita/1570025865685-1544637932547-sandui%CC%81che%20pasta.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		sanduíche, sanduíche de atum	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
209	Mate com limão		https://cdn.panelinha.com.br/receita/1511900022715-mate%20receita.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		mate, mate com limão, chá mate, chá mate com limão	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
210	Bolinho de bacalhau com inhame		https://cdn.panelinha.com.br/receita/1478224800000-Bolinho-de-bacalhau-com-inhame.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		bolinho, bolinho de bacalhau, bolo de inhame	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
211	Caipirinha de maracujá com gengibre e folhas de mexerica		https://cdn.panelinha.com.br/receita/1457665200000-Caipirinha-de-maracuja-com-gengibre-e-folhas-de-mexerica.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		caipirinha, caipirinha de maracujá, suco de maracujá, caipirinha de maracujá com gengibre, suco de maracujá com gengibre	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
212	Gim tônica cítrica		https://cdn.panelinha.com.br/receita/1349060400000-Gim-tonica-citrica.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		gim, gim tonica, gim tonica cítrica	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
213	Crudités de legumes		https://cdn.panelinha.com.br/receita/1450058400000-Crudites-de-legumes.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		crudités, crudités de legumes, crudite, crudité de legume	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
214	Dip de feijão branco		https://cdn.panelinha.com.br/receita/1391652000000-Dip-de-feijao-branco.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		dip, dip de feijão, dip de feijão branco	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
215	Pão integral com nozes		https://cdn.panelinha.com.br/receita/1515091594755-pa%CC%83o%20nozes%20receita.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		pão, pão integral, pão integral com nozes, pão com nozes	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
216	Geleia de figo e vinho tinto		https://cdn.panelinha.com.br/receita/1432609200000-Geleia-de-figo-e-vinho-tinto.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		geleia, geleia de figo, geleia de figo e vinho, geleia com vinho	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
217	Rabanada salgada com queijo		https://cdn.panelinha.com.br/receita/1432609200000-Rabanada-salgada.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		rabanada, rabanada salgada, rabanada salgada com queijo, rabanada com queijo	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
218	Salada de frutas com nibs de cacau		https://cdn.panelinha.com.br/receita/1459998000000-Salada-de-frutas-com-nibs-de-cacau.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		salada de frutas, salada de fruta, salada de fruta com chocolate, salada de frutas com chocolate, salada de frutas com cacau, salada de frutas com nibs de cacau	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
219	Cocada de forno		https://cdn.panelinha.com.br/receita/1554380728519-IMG_9235-2.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		cocada, cocada de forno	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
220	Feijão-carioca com cominho		https://cdn.panelinha.com.br/receita/1489425336617-301213.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		feijão, feijão carioca, feijão carioca com cominho	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
221	Carne com batata e cenoura na panela de pressão		https://cdn.panelinha.com.br/receita/1636135550572-carne-com-batata-pressao.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		carne, carne com batata, carne com batata e cenoura, carne com batata e cenoura na panela de pressão, carne de panela, carne na panela de pressão	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
222	Pizza de muçarela		https://cdn.panelinha.com.br/receita/1443495600000-Pizza-de-mucarela-caseira.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		pizza, pizza de mozarela, pizza de muçarela, pizza de mozzarella, pizza muçarela, pizza mozzarella, pizza mozarela, pizza de queijo muçarela, pizza caseira, pizza caseira de mozarela, pizza caseira de muçarela, pizza caseira de mozzarella	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
223	Musse de chocolate		https://cdn.panelinha.com.br/receita/1427252400000-Musse-de-chocolate-levissima.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		mousse, mousse de chocolate, mousse de chocolate levissima, musse de chocolate, musse	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
224	Salada de cebola com pepino e molho de coentro		https://cdn.panelinha.com.br/receita/1473649200000-Salada-de-cebola-com-pepino-e-molho-de-coentro.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		salada, salada de cebola, salada de cebolas, salada de cebola com pepino, salada de cebola com pepinos, salada de cebola com pepino e molho de coentro, salada de cebola com pepinos e molho de coentro, salada de cebolas com pepino, salada de cebolas com pepinos, salada de cebolas com pepino e molho de coentro, salada de cebolas com pepinos e molho de coentro	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
225	Gratinado de batata com frango		https://cdn.panelinha.com.br/receita/1448503200000-Gratinado-de-batata-com-frango.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		gratinado, gratinado de batata, gratinado de batata com frango	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
226	Massa caseira com semolina		https://cdn.panelinha.com.br/receita/1623786205817-massa-caseira.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		massa caseira, massa caseira com semolina, massa com semolina, massa com sêmola, massa caseira com sêmola	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
227	Macarrão com legumes assados		https://cdn.panelinha.com.br/receita/1624481906297-macarra%CC%83o-legumes.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		macarrão, macarrão com legumes, macarrão com legumes assados, massa com legumes, massa com legumes assados	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
228	Sopa de feijão com macarrão		https://cdn.panelinha.com.br/receita/1616683531341-sopa-de-feija%CC%83o-com-macarra%CC%83o.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		sopa de feijão, sopa de feijão com macarrão, sopa de feijão e macarrão	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
229	Farofa de milho com cenoura e bacon		https://cdn.panelinha.com.br/receita/1639142039327-farofa.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		farofa, farofa de milho, farofa de milho com cenoura, farofa de milho com cenoura e bacon, farofa de milho com bacon, farofa com cenoura, farofa com bacon	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
230	Cuscuz nordestino		https://s2.glbimg.com/0BsLY23sXDUg6wyeawk3Ur39CW0=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/H/m/TB0qseRj2xqTSntdQRPQ/cuscuz.jpg	0	113.45948028564453	0	25.281415939331055	0.7456666827201843	2.15625	0.20000000298023224	0.20000000298023224	0.30000001192092896	0	0.6796666383743286	2.053333282470703	0	0	0	f	/images/food/corn-flour.svg	cuscuz, cuscuz nordestino	5	0	0	0	0	0	0	0	0	0	0	0	0.06333333253860474	0	0	0	0	1.5406666994094849	0	0	0	0	0	0	0	0	0	0	0	0	0	0.1733333319425583	0	0	0	0	0	2.7179999351501465	0.023000000044703484	0	0	23.182666778564453	10.853666305541992	0	0	0	247.66600036621094	0	0	0	0	0.20200000703334808			
231	Cuscuz à paulista		https://t2.rg.ltmcdn.com/pt/images/8/8/0/img_cuscuz_a_paulista_88_600.jpg	0	142.1230010986328	0	22.5136661529541	1.343000054359436	2.558333396911621	1.7999999523162842	1.7999999523162842	0.800000011920929	15.048666954040527	4.648333549499512	2.432666778564453	0	0	0	f	/images/food/corn-flour.svg	cuscuz à paulista, cuscuz paulista, cuscuz a paulista	5	0	0	0	0	0	0	0	0	0	0.9333333373069763	0	0	0	0	0	0	14.161333084106445	0	0.04899999871850014	0	0	0	0	0	0	0	0	0	0	0	0.33000001311302185	0	0	0	0	0	5.0960001945495605	0.06266666948795319	0	0	25.952333450317383	52.93266677856445	0	0	0	235.7096710205078	0	0	0	0	0.20999999344348907			
232	Feijão tropeiro mineiro		https://www.comidaereceitas.com.br/wp-content/uploads/2021/02/feijao_tropeiro_mineiro-780x426.jpg	0	151.56185913085938	0	19.581832885742188	1.7890000343322754	10.170833587646484	2.1600000858306885	2.866666555404663	1.5266666412353516	67.87933349609375	6.790666580200195	3.573333263397217	0	0	0	f	/images/food/bean.svg	feijão tropeiro mineiro, feijão tropeiro, feijão mineiro, feijão com tropeiro com torresmo, feijão tropeiro com couve	5	8.770000457763672	0	0	0	0	0	0	0	0	1.4366666078567505	0	0	0	0	0	0	41.1956672668457	0	0.21699999272823334	0	0	0	0	0	0	0	0	0	0	0	2.1623332500457764	0	0	0	0	0	36.1053352355957	0.3816666603088379	0	0	199.2550048828125	348.9293212890625	0	0	0	365.0743408203125	0	0	0	0	1.4463332891464233			
233	Feijoada		https://cdn.panelinha.com.br/receita/1588270905274-39_Panelinha_12_02_200635.jpg	0	116.93345642089844	0	11.641833305358887	1.4086666107177734	8.670833587646484	1.9233332872390747	2.5866665840148926	1.5833333730697632	21.963333129882812	6.4773335456848145	5.090000152587891	0	0	0	f	/images/food/bean.svg	feijoada, feijoada completa	5	0	0	0	0	0	0.07666666805744171	0	0	0.029999999329447746	0.9300000071525574	0	0	0	0	0	0	32.38166809082031	0	0.1536666601896286	0	0	0	0	0	0	0	0	0	0	0	1.347000002861023	0	0	0	0	0	31.849666595458984	0.2433333396911621	0	0	105.46233367919922	303.4930114746094	0	0	0	278.2203369140625	0	0	0	0	0.8316666483879089			
234	Quibebe	Quibebe é um prato de origem africana, típico da culinária brasileira. É um purê de abóbora que acompanha, geralmente, carne, frango ou peixe.	https://cdn.panelinha.com.br/receita/1555347218472-CP-2019-29-01_6544.jpg	0	86.34922790527344	0	6.644083499908447	1.0216666460037231	8.556249618530273	1.0423333644866943	1.1053333282470703	0.23999999463558197	0	2.671999931335449	1.6666666269302368	0	0	0	f	/images/food/mashed-potato.png	quibebe, purê de abóbora, quibebe de abóbora, quibebe de mandioca	5	0	0	0	0	0	0	0	0	0.029999999329447746	0	0	0.036666665226221085	0	0	0	0	7.684666633605957	0	0.6060000061988831	0	0	0	0	0	0	0	0	0	0	0	0.778333306312561	0	0	0	0	0	10.395000457763672	0.0533333346247673	0	0	42.525001525878906	152.8126678466797	0	0	0	246.61399841308594	0	0	0	0	1.6366666555404663			
235	Sarapatel		https://t1.rg.ltmcdn.com/pt/images/1/0/9/sarapatel_nordestino_2901_orig.jpg	0	122.98185729980469	0	1.094083309173584	1.0616666078567505	18.472917556762695	1.3930000066757202	1.1059999465942383	0.7179999947547913	315.3573303222656	4.420000076293945	0	0	0	0	f	/images/food/nabe.png	sarapatel, sarapatel nordestino, sarapatel tradicional	5	1463.6666259765625	0	0	0	0	0	0	0	0.10999999940395355	3.8366665840148926	0	0	0	0	0	0	12.234333038330078	0	1.4833333492279053	0	0	0	0	0	0	0	0	0	0	0	7.176333427429199	0	0	0	0	0	12.79699993133545	0.10366666316986084	0	0	163.5019989013672	198.7570037841797	0	0	0	215.62266540527344	0	0	0	0	1.7703332901000977			
236	Tacacá		https://t1.rg.ltmcdn.com/pt/images/5/1/9/img_tacaca_paraense_2915_orig.jpg	0	46.88917541503906	0	3.390000104904175	4.098999977111816	6.958333492279053	0.1756666600704193	0.12833333015441895	0	70.56199645996094	0.3596666753292084	0.2133333384990692	0	0	0	f	/images/food/soup.svg	tacacá, tacacá paraense, tacacá do norte, tacacá do pará	5	0	0	0	0	0	0.046666666865348816	0	0	0	0	0	0	0	0	0	0	44.818668365478516	0	0.21899999678134918	0	0	0	0	0	0	0	0	0	0	0	0.9493333101272583	0	0	0	0	0	29.89900016784668	0.11533333361148834	0	0	89.16799926757812	240.18333435058594	0	0	0	1349.0626220703125	0	0	0	0	0.7940000295639038			
237	Caldo de tucupi		https://t2.rg.ltmcdn.com/pt/images/7/1/7/caldo_de_tucupi_2717_600.jpg	0	347.8265686035156	0	63.59175109863281	0.5080000162124634	0.08958332985639572	6.045333385467529	2.9630000591278076	0.18766666948795319	31.190332412719727	10.908333778381348	0	0	0	0	f	/images/food/yellow-sauce.png	caldo de tucupi, tucupi, tucupi de mandioca	5	75.26667022705078	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	30.025333404541016	0	0.00800000037997961	0	0	0	0	0	0	0	0	0	0	0	0.23999999463558197	0	0	0	0	0	3.2179999351501465	0.05999999865889549	0	0	8.427000045776367	19.30500030517578	0	0	0	157.5243377685547	0	0	0	0	0.03799999877810478			
238	Arroz com figo seco e especiarias		https://cdn.panelinha.com.br/receita/1608244418784-arroz%20com%20figo%20e%20cebola%20blog.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		arroz com figo, arroz com figo seco, arroz com figo seco e especiarias	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
239	Salada de feijão branco com salsão		https://cdn.panelinha.com.br/receita/1636125267265-branco-salsao-limao.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		salada de feijão, salada de feijão branco, salada de feijão branco com salsão	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
240	Bisteca grelhada		https://cdn.panelinha.com.br/receita/1468206000000-Bisteca-grelhada.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f			5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
241	Homus com cordeiro		https://cdn.panelinha.com.br/receita/1632776457017-homus.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		humus com cordeiro, homus com cordeiro	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
242	Homus		https://static.clubedaanamariabraga.com.br/wp-content/uploads/2019/03/homus-1024x768.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		homus, hômus, humus, pasta de grão de bico	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
243	Pasta de alho		https://static.clubedaanamariabraga.com.br/wp-content/uploads/2019/08/pasta-de-alho-caseira.jpg	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		pasta de alho	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
244	Frango na panela de pressão		https://www.receiteria.com.br/wp-content/uploads/frango-facil-naa-de-pressao.png	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	f		frango na panela, frango na panela de pressão, molho de frango, molho de frango com tomate	5	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0			
245	Feijão carioca cozido		https://www.sabornamesa.com.br/media/k2/items/cache/e63eba4a60c5a7383338249762b2606c_XL.jpg	0	76.42408752441406	0	13.591032981872559	0.7409999966621399	4.775000095367432	0.10000000149011612	0.10000000149011612	0.30000001192092896	0	0.5423333048820496	8.510333061218262	0	0	0	f	/images/food/bean.svg	feijão-carioca, feijão carioca, feijão carioca cozido, feijão-carioca cozido	5	0	0	0	0	0	0.03999999910593033	0	0	0	0	0	0	0	0	0	0	26.594667434692383	0	0.18833333253860474	0	0	0	0	0	0	0	0	0	0	0	1.2890000343322754	0	0	0	0	0	42.33966827392578	0.28433331847190857	0	0	86.85433197021484	254.61666870117188	0	0	0	1.7589999437332153	0	0	0	0	0.699999988079071			
246	Feijão carioca cru		https://http2.mlstatic.com/D_NQ_NP_832877-MLB40140053658_122019-O.jpg	0	329.0267333984375	0	61.22145080566406	3.5433332920074463	19.981884002685547	0.20000000298023224	0.10000000149011612	0.8999999761581421	0	1.256666660308838	18.420000076293945	0	0	0	f	/images/food/bean.svg	farinha de feijão-carioca, farinha de feijão carioca, feijão carioca moído, feijão-carioca moído, feijão carioca cru, feijão-carioca cru	5	0	0	0	0	0	0.1666666716337204	0	0	0	4.023333549499512	0	0.6499999761581421	0	0	0	0	122.56999969482422	0	0.7900000214576721	0	0	0	0	0	0	0	0	0	0	0	7.986666679382324	0	0	0	0	0	209.94667053222656	1.0199999809265137	0	0	385.3766784667969	1352.4566650390625	0	0	0	0	0	0	0	0	2.9033334255218506			
247	Feijão fradinho cozido		https://www.marolacomcarambola.com.br/wp-content/uploads/2019/04/receita-de-feijao-fradinho-com-calabresa-2.jpg	0	78.00889587402344	0	13.49958324432373	0.753333330154419	5.09375	0.20000000298023224	0.10000000149011612	0.30000001192092896	0	0.6439999938011169	7.4720001220703125	0	0	0	f	/images/food/bean.svg	feijão-fradinho, feijão fradinho, feijão fradinho cozido, feijão-fradinho cozido	5	0	0	0	0	0	0.12333333492279053	0	0	0	0	0	0	0	0	0	0	17.453332901000977	0	0.10266666859388351	0	0	0	0	0	0	0	0	0	0	0	1.059666633605957	0	0	0	0	0	38.11833190917969	0.5299999713897705	0	0	84.59266662597656	252.97633361816406	0	0	0	0.9819999933242798	0	0	0	0	1.1153333187103271			
248	Feijão fradinho cru		https://emporioquatroestrelas.vteximg.com.br/arquivos/ids/158084-1000-1000/Feijao-Fradinho-500g.png?v=636930890740770000	0	339.1647644042969	0	61.2400016784668	3.490000009536743	20.20833396911621	0.699999988079071	0.20000000298023224	0.8999999761581421	0	2.365000009536743	23.593334197998047	0	0	0	f	/images/food/bean.svg	farinha de feijão-fradinho, farinha de feijão fradinho, feijão fradinho moído, feijão-fradinho moído, feijão fradinho cru, feijão-fradinho cru	5	0	0	0	0	0	0.1366666704416275	0	0	0.029999999329447746	0	0	0.25999999046325684	0	0	0	0	77.52300262451172	0	0.6986666917800903	0	0	0	0	0	0	0	0	0	0	0	5.128666877746582	0	0	0	0	0	178.3906707763672	1.4279999732971191	0	0	354.5150146484375	1082.7432861328125	0	0	0	10.313666343688965	0	0	0	0	3.88266658782959			
249	Feijão jalo cozido		https://i1.wp.com/files.agro20.com.br/uploads/2019/10/Feij%C3%A3o-jalo-1.jpg?fit=1024%2C682&ssl=1	0	92.73992156982422	0	16.495250701904297	1.006666660308838	6.143750190734863	0.10000000149011612	0.10000000149011612	0.30000001192092896	0	0.5120000243186951	13.866000175476074	0	0	0	f	/images/food/bean.svg	feijão-jalo, feijão jalo, feijão jalo cozido, feijão-jalo cozido	5	0	0	0	0	0	0.12666666507720947	0	0	0	0	0	0.03999999910593033	0	0	0	0	29.400667190551758	0	0.23633334040641785	0	0	0	0	0	0	0	0	0	0	0	1.9210000038146973	0	0	0	0	0	44.104000091552734	0.320333331823349	0	0	121.00833129882812	347.7206726074219	0	0	0	0.5203333497047424	0	0	0	0	1.0140000581741333			
250	Feijão jalo cru		http://d3ugyf2ht6aenh.cloudfront.net/stores/818/927/products/feijao-jalo1-09b93785daa32ae71415326974364620-640-0.jpeg	0	327.9052734375	0	61.47916793823242	3.93666672706604	20.10416603088379	0.30000001192092896	0.20000000298023224	0.6000000238418579	0	0.9466666579246521	30.31999969482422	0	0	0	f	/images/food/bean.svg	farinha de feijão-jalo, farinha de feijão jalo, feijão jalo moído, feijão-jalo moído, feijão jalo cru, feijão-jalo cru	5	0	0	0	0	0	0.10000000149011612	0	0	0	0	0	0.12333333492279053	0	0	0	0	97.97000122070312	0	0.9509999752044678	0	0	0	0	0	0	0	0	0	0	0	7.0276665687561035	0	0	0	0	0	169.9029998779297	0.9909999966621399	0	0	427.1889953613281	1275.9512939453125	0	0	0	24.580333709716797	0	0	0	0	3.00600004196167			
251	Feijão preto cozido		https://images.aws.nestle.recipes/resized/a50c044300b75df1169dd0f8e885bad4_feijao-preto-bem-temperado-receitas-nestle_1200_600.jpg	29	77.02726745605469	0	14.005167007446289	0.7620000243186951	4.479166507720947	0.10000000149011612	0.10000000149011612	0.30000001192092896	0	0.5356666445732117	8.40233325958252	0	0	0	f	/images/food/bean.svg	feijão, feijoada, feijão-preto, feijão preto, feijão preto cozido, feijão-preto cozido	5	0	0	0	0	0	0.05999999865889549	0	0	0	0	0	0.029999999329447746	0	0	0	0	29.00433349609375	0	0.19766665995121002	0	0	0	0	0	0	0	0	0	0	0	1.465666651725769	0	0	0	0	0	40.371334075927734	0.36533331871032715	0	0	88.03067016601562	256.3733215332031	0	0	0	1.8539999723434448	0	0	0	0	0.7210000157356262			
252	Feijão preto cru		https://minhasaude.proteste.org.br//wp-content/uploads/2020/07/escolher-o-feijao-preto-970x472.jpg	29	323.5657043457031	0	58.752464294433594	3.7866666316986084	21.344202041625977	0.20000000298023224	0.10000000149011612	0.800000011920929	0	1.2400000095367432	21.83333396911621	0	0	0	f	/images/food/bean.svg	feijão cru, feijão-preto cru, farinha de feijão, farinha de feijão-preto, farelo de feijão, farelo de feijão-preto, feijão moído, feijão moído-preto	5	0	0	0	0	0	0.11666666716337204	0	0	0	4.599999904632568	0	0.5899999737739563	0	0	0	0	110.90333557128906	0	0.8266666531562805	0	0	0	0	0	0	0	0	0	0	0	6.4633331298828125	0	0	0	0	0	188.10667419433594	1.315999984741211	0	0	471.15667724609375	1415.6800537109375	0	0	0	0	0	0	0	0	2.8533332347869873			
253	Feijão rajado cozido		https://cdn.levty.com/camil/prd/imagem/feijao_rajado/FEIJAO_RAJADO.jpg	29	84.70185089111328	0	15.267499923706055	0.9306666851043701	5.537499904632568	0.10000000149011612	0	0.20000000298023224	0	0.4000000059604645	9.317999839782715	0	0	0	f	/images/food/bean.svg	feijão-rajado, feijão rajado, feijão rajado cozido, feijão-rajado cozido	5	0	0	0	0	0	0.09333333373069763	0	0	0	0	0	0.03999999910593033	0	0	0	0	29.189666748046875	0	0.22699999809265137	0	0	0	0	0	0	0	0	0	0	0	1.3573333024978638	0	0	0	0	0	41.707332611083984	0.2943333387374878	0	0	112.9316635131836	314.5840148925781	0	0	0	0.6869999766349792	0	0	0	0	0.9190000295639038			
254	Feijão rajado cru		https://i2.wp.com/files.agro20.com.br/uploads/2020/03/feijaorajado2.jpg?resize=600%2C338&ssl=1	29	325.84442138671875	0	62.92916488647461	3.6666667461395264	17.27083396911621	0.4000000059604645	0.10000000149011612	0.800000011920929	0	1.1699999570846558	24.00666618347168	0	0	0	f	/images/food/bean.svg	farinha de feijão rajado, farinha de feijão-rajado, feijão rajado moído, feijão rajado-moído, feijão rajado cru, feijão-rajado cru	5	0	0	0	0	0	0.07000000029802322	0	0	0.029999999329447746	0	0	0.06666667014360428	0	0	0	0	111.42533111572266	0	0.8443333506584167	0	0	0	0	0	0	0	0	0	0	0	18.581666946411133	0	0	0	0	0	169.90032958984375	1.1699999570846558	0	0	334.788330078125	1134.5416259765625	0	0	0	13.650333404541016	0	0	0	0	2.5966665744781494			
255	Feijão rosinha cozido		https://www.comidaereceitas.com.br/wp-content/uploads/2021/07/feijao_linguica-780x449.jpg	0	67.86622619628906	0	11.822750091552734	0.5793333053588867	4.539583206176758	0.20000000298023224	0	0.20000000298023224	0	0.47733333706855774	4.760000228881836	0	0	0	f	/images/food/bean.svg	feijão-rosinha, feijão rosinha, feijão rosinha cozido, feijão-rosinha cozido	5	0	0	0	0	0	0	0	0	0	3.690000057220459	0	0	0	0	0	0	19.243999481201172	0	0.09166666865348816	0	0	0	0	0	0	0	0	0	0	0	1.184333324432373	0	0	0	0	0	42.95966720581055	0.46133333444595337	0	0	89.50900268554688	240.56700134277344	0	0	0	2.0806667804718018	0	0	0	0	1.3049999475479126			
256	Feijão rosinha cru		https://emporioquatroestrelas.vteximg.com.br/arquivos/ids/158091-1000-1000/Feijao-Rosinha-500g.png?v=636930970411630000	0	336.9619140625	0	62.223331451416016	3.5766665935516357	20.91666603088379	0.6000000238418579	0.10000000149011612	0.699999988079071	0	1.3300000429153442	20.626667022705078	0	0	0	f	/images/food/bean.svg	farinha de feijão rosinha, farinha de feijão-rosinha, feijão rosinha moído, feijão rosinha-moído, feijão rosinha cru, feijão-rosinha cru	5	0	0	0	0	0	0.16333332657814026	0	0	0.029999999329447746	3.9233334064483643	0	0	0	0	0	0	67.66166687011719	0	0.5953333377838135	0	0	0	0	0	0	0	0	0	0	0	5.320333480834961	0	0	0	0	0	184.49732971191406	1.0783333778381348	0	0	393.58599853515625	1108.65966796875	0	0	0	24.114334106445312	0	0	0	0	3.9779999256134033			
257	Feijão roxo cozido		https://www.receiteria.com.br/wp-content/uploads/receitas-com-feijao-vermelho-0.jpg	0	76.89337921142578	0	12.908166885375977	0.846666693687439	5.7208333015441895	0.10000000149011612	0.10000000149011612	0.30000001192092896	0	0.5383333563804626	11.514333724975586	0	0	0	f	/images/food/bean.svg	feijão-roxo, feijão roxo, feijão roxo cozido, feijão-roxo cozido	5	0	0	0	0	0	0.14666666090488434	0	0	0	0	0	0.029999999329447746	0	0	0	0	22.531999588012695	0	0.22466666996479034	0	0	0	0	0	0	0	0	0	0	0	1.4110000133514404	0	0	0	0	0	34.39266586303711	0.32100000977516174	0	0	106.32499694824219	268.0863342285156	0	0	0	1.4570000171661377	0	0	0	0	1.00600004196167			
258	Feijão roxo cru		https://www.mercadaonatural.com.br/resizer/view/600/600/true/false/14305.jpg	0	331.41497802734375	0	59.98666763305664	3.9733333587646484	22.16666603088379	0.30000001192092896	0.20000000298023224	0.800000011920929	0	1.2366666793823242	33.84333419799805	0	0	0	f	/images/food/bean.svg	farinha de feijão-roxo, farinha de feijão roxo, feijão roxo moído, feijão-roxo moído, feijão roxo cru, feijão-roxo cru	5	0	0	0	0	0	0.2633333206176758	0	0	0	0	0	0.07999999821186066	0	0	0	0	120.4576644897461	0	1.037333369255066	0	0	0	0	0	0	0	0	0	0	0	6.917333126068115	0	0	0	0	0	161.93533325195312	1.340666651725769	0	0	393.6983337402344	1221.39697265625	0	0	0	9.75766658782959	0	0	0	0	3.2929999828338623			
259	feijão branco		https://www.sabornamesa.com.br/media/k2/items/cache/8fff24d59ce766ab65e090a401680032_XL.jpg	0	142	0	25.809999465942383	0	8.970000267028809	0.16599999368190765	0	0	0	0.6399999856948853	0	0	0	0	f	/images/food/bean.svg	feijão branco, feijão-branco, feijão-branco cozido, feijão-branco-cozido	5	0	376	0	555	1085	0	0	0	0.05900000035762787	0.2720000147819519	0	0.12700000405311584	0	0	0	0	73	0	0.14900000393390656	0	98	0	0	0	0	0	1368	0	350	250	2.8399999141693115	396	0	716	0	616	68	0.5099999904632568	135	485	169	463	380	0	488	2	377	106	253	469	1.090000033378601			
\.


--
-- Data for Name: Ingredient; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Ingredient" ("Id", "Text", "FoodId", "Quantity", "MeasureId", "RecipeStepId", "AminoAcids_Alanine", "AminoAcids_Arginine", "AminoAcids_AsparticAcid", "AminoAcids_Cystine", "AminoAcids_GlutamicAcid", "AminoAcids_Glutamine", "AminoAcids_Glycine", "AminoAcids_Histidine", "AminoAcids_Isoleucine", "AminoAcids_Leucine", "AminoAcids_Lysine", "AminoAcids_Methionine", "AminoAcids_Phenylalanine", "AminoAcids_Proline", "AminoAcids_Serine", "AminoAcids_Threonine", "AminoAcids_Tryptophan", "AminoAcids_Tyrosine", "AminoAcids_Valine", "NutritionalInformation_Calories", "NutritionalInformation_Carbohydrates", "NutritionalInformation_DietaryFiber", "Minerals_Calcium", "Minerals_Copper", "Minerals_Fluoride", "Minerals_Iron", "Minerals_Magnesium", "Minerals_Manganese", "Minerals_Phosphorus", "Minerals_Potassium", "Minerals_Selenium", "Minerals_Sodium", "Minerals_Zinc", "NutritionalInformation_Proteins", "NutritionalInformation_TotalFat", "Vitamins_A", "Vitamins_AlphaCarotene", "Vitamins_B1", "Vitamins_B11", "Vitamins_B12", "Vitamins_B2", "Vitamins_B3", "Vitamins_B5", "Vitamins_B6", "Vitamins_B7", "Vitamins_B9", "Vitamins_BetaCarotene", "Vitamins_C", "Vitamins_Choline", "Vitamins_CryptoxanthinCarotene", "Vitamins_D", "Vitamins_D2", "Vitamins_D3", "Vitamins_E", "Vitamins_K", "Vitamins_Lycopene", "NutritionalInformation_Acidification", "NutritionalInformation_Ashes", "NutritionalInformation_Cholesterol", "NutritionalInformation_Gi", "NutritionalInformation_Gl", "NutritionalInformation_MonounsaturatedFats", "NutritionalInformation_PolyunsaturatedFats", "NutritionalInformation_SaturedFats") FROM stdin;
\.


--
-- Data for Name: Measure; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Measure" ("Id", "Type", "Quantity", "FoodId") FROM stdin;
1	3	201	1
2	3	905	2
3	3	2500	3
4	3	255	4
5	0	160	6
6	1	10	6
7	2	3.5	6
8	0	160	8
9	1	10	8
10	2	3.5	8
11	0	240	9
12	3	250	14
13	10	31.399999618530273	16
14	0	158	21
15	0	234	26
16	0	240	27
17	1	15	27
18	2	5	27
19	8	160	28
20	3	100	30
21	3	110	31
22	3	70	32
23	3	225	34
24	3	240	35
25	3	170	36
26	5	270	36
27	3	140	37
28	3	220	50
29	4	100	55
30	3	125	55
31	5	150	55
32	3	61	58
33	3	130	59
34	3	320	64
35	3	35	66
36	0	80	69
37	1	5	69
38	2	1.5	69
39	3	600	71
40	0	120	83
41	1	7.5	83
42	2	2.5	83
43	3	60	85
44	3	60	86
45	9	400	88
46	3	15	93
47	3	154	103
48	3	137	104
49	3	170	109
50	3	500	112
51	3	192	114
52	3	400	116
53	3	44	120
54	3	135	125
55	7	170	126
56	7	350	130
57	3	24	131
58	1	6	132
59	1	2.5	137
60	3	46	138
61	3	38	145
62	11	30	151
63	3	35	152
64	3	178	153
65	3	215	158
66	3	215	159
67	3	215	160
68	0	233	161
69	11	30	162
70	11	30	164
71	3	50	175
72	3	900	176
73	3	100	178
74	0	248	187
75	3	123	190
76	11	123	190
77	12	200	194
78	0	172	251
79	0	172	252
80	0	172	253
81	0	172	254
82	0	3	\N
83	3	3	\N
84	0	3	\N
85	3	3	\N
86	0	3	\N
87	3	3	\N
88	3	3	\N
89	0	1	\N
90	3	3	\N
91	0	1	\N
92	1	3	\N
93	3	3	\N
94	0	1	\N
95	1	3	\N
96	3	3	\N
97	0	1	\N
98	1	3	\N
99	3	3	\N
100	0	1	\N
101	1	3	\N
102	0	3	\N
103	0	1	\N
104	0	1	\N
105	0	3	\N
106	0	1	\N
107	0	1	\N
108	0	3	\N
109	0	1	\N
110	0	1	\N
111	0	3	\N
112	0	1	\N
113	0	1	\N
114	0	3	\N
115	0	1	\N
116	0	1	\N
\.


--
-- Data for Name: RecipeStep; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."RecipeStep" ("Id", "Title", "Preparation", "Additional", "RecipeId", "AminoAcids_Alanine", "AminoAcids_Arginine", "AminoAcids_AsparticAcid", "AminoAcids_Cystine", "AminoAcids_GlutamicAcid", "AminoAcids_Glutamine", "AminoAcids_Glycine", "AminoAcids_Histidine", "AminoAcids_Isoleucine", "AminoAcids_Leucine", "AminoAcids_Lysine", "AminoAcids_Methionine", "AminoAcids_Phenylalanine", "AminoAcids_Proline", "AminoAcids_Serine", "AminoAcids_Threonine", "AminoAcids_Tryptophan", "AminoAcids_Tyrosine", "AminoAcids_Valine", "Minerals_Calcium", "Minerals_Copper", "Minerals_Fluoride", "Minerals_Iron", "Minerals_Magnesium", "Minerals_Manganese", "Minerals_Phosphorus", "Minerals_Potassium", "Minerals_Selenium", "Minerals_Sodium", "Minerals_Zinc", "NutritionalInformation_Acidification", "NutritionalInformation_Ashes", "NutritionalInformation_Calories", "NutritionalInformation_Carbohydrates", "NutritionalInformation_Cholesterol", "NutritionalInformation_DietaryFiber", "NutritionalInformation_Gi", "NutritionalInformation_Gl", "NutritionalInformation_MonounsaturatedFats", "NutritionalInformation_PolyunsaturatedFats", "NutritionalInformation_Proteins", "NutritionalInformation_SaturedFats", "NutritionalInformation_TotalFat", "Vitamins_A", "Vitamins_AlphaCarotene", "Vitamins_B1", "Vitamins_B11", "Vitamins_B12", "Vitamins_B2", "Vitamins_B3", "Vitamins_B5", "Vitamins_B6", "Vitamins_B7", "Vitamins_B9", "Vitamins_BetaCarotene", "Vitamins_C", "Vitamins_Choline", "Vitamins_CryptoxanthinCarotene", "Vitamins_D", "Vitamins_D2", "Vitamins_D3", "Vitamins_E", "Vitamins_K", "Vitamins_Lycopene") FROM stdin;
\.


--
-- Data for Name: Recipes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Recipes" ("Id", "Name", "Description", "Additional", "OwnerId", "AminoAcids_Alanine", "AminoAcids_Arginine", "AminoAcids_AsparticAcid", "AminoAcids_Cystine", "AminoAcids_GlutamicAcid", "AminoAcids_Glutamine", "AminoAcids_Glycine", "AminoAcids_Histidine", "AminoAcids_Isoleucine", "AminoAcids_Leucine", "AminoAcids_Lysine", "AminoAcids_Methionine", "AminoAcids_Phenylalanine", "AminoAcids_Proline", "AminoAcids_Serine", "AminoAcids_Threonine", "AminoAcids_Tryptophan", "AminoAcids_Tyrosine", "AminoAcids_Valine", "Minerals_Calcium", "Minerals_Copper", "Minerals_Fluoride", "Minerals_Iron", "Minerals_Magnesium", "Minerals_Manganese", "Minerals_Phosphorus", "Minerals_Potassium", "Minerals_Selenium", "Minerals_Sodium", "Minerals_Zinc", "NutritionalInformation_Acidification", "NutritionalInformation_Ashes", "NutritionalInformation_Calories", "NutritionalInformation_Carbohydrates", "NutritionalInformation_Cholesterol", "NutritionalInformation_DietaryFiber", "NutritionalInformation_Gi", "NutritionalInformation_Gl", "NutritionalInformation_MonounsaturatedFats", "NutritionalInformation_PolyunsaturatedFats", "NutritionalInformation_Proteins", "NutritionalInformation_SaturedFats", "NutritionalInformation_TotalFat", "Vitamins_A", "Vitamins_AlphaCarotene", "Vitamins_B1", "Vitamins_B11", "Vitamins_B12", "Vitamins_B2", "Vitamins_B3", "Vitamins_B5", "Vitamins_B6", "Vitamins_B7", "Vitamins_B9", "Vitamins_BetaCarotene", "Vitamins_C", "Vitamins_Choline", "Vitamins_CryptoxanthinCarotene", "Vitamins_D", "Vitamins_D2", "Vitamins_D3", "Vitamins_E", "Vitamins_K", "Vitamins_Lycopene") FROM stdin;
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20250604122540_createFood	9.0.5
20250604125624_addKeysToFood	9.0.5
20250604130525_addFoodType	9.0.5
20250604135428_addMineralsVitaminsAndAminoacids	9.0.5
20250614141106_oneMeasuresCollection	9.0.5
20250819114041_RenameNameAndDescriptionToPt	9.0.5
20250819114411_nameAndDescInEnglish	9.0.5
20250819120109_recipeIngredientsText	9.0.5
20250819121901_recipeIngredients	9.0.5
20250821093616_renameKeysToPt	9.0.5
20250821093744_addKeys	9.0.5
20250825091536_RecipeOwnerId	9.0.5
20250826133447_RecipeId	9.0.8
20250904105249_TypeFloatToDouble	9.0.8
20250905111535_RenameStepToPascalCase	9.0.8
20250906142712_IngredientWithNutritionInformation	9.0.8
20250906145955_IngredientAndRecipeWithNutritionalInformation	9.0.8
20250907024437_RemoveRecipeStepDescription	9.0.8
20250908143103_AddNutritionalInformationToAllParts	9.0.8
\.


--
-- Name: Ingredient_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Ingredient_Id_seq"', 35, true);


--
-- Name: Measure_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Measure_Id_seq"', 116, true);


--
-- Name: RecipeStep_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."RecipeStep_Id_seq"', 13, true);


--
-- Name: foods_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."foods_Id_seq"', 263, true);


--
-- Name: recipes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.recipes_id_seq', 14, true);


--
-- Name: Foods PK_Foods; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Foods"
    ADD CONSTRAINT "PK_Foods" PRIMARY KEY ("Id");


--
-- Name: Ingredient PK_Ingredient; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Ingredient"
    ADD CONSTRAINT "PK_Ingredient" PRIMARY KEY ("Id");


--
-- Name: Measure PK_Measure; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Measure"
    ADD CONSTRAINT "PK_Measure" PRIMARY KEY ("Id");


--
-- Name: RecipeStep PK_RecipeStep; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."RecipeStep"
    ADD CONSTRAINT "PK_RecipeStep" PRIMARY KEY ("Id");


--
-- Name: Recipes PK_Recipes; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Recipes"
    ADD CONSTRAINT "PK_Recipes" PRIMARY KEY ("Id");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: IX_Ingredient_FoodId; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IX_Ingredient_FoodId" ON public."Ingredient" USING btree ("FoodId");


--
-- Name: IX_Ingredient_MeasureId; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IX_Ingredient_MeasureId" ON public."Ingredient" USING btree ("MeasureId");


--
-- Name: IX_Ingredient_RecipeStepId; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IX_Ingredient_RecipeStepId" ON public."Ingredient" USING btree ("RecipeStepId");


--
-- Name: IX_Measure_FoodId; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IX_Measure_FoodId" ON public."Measure" USING btree ("FoodId");


--
-- Name: IX_RecipeStep_RecipeId; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IX_RecipeStep_RecipeId" ON public."RecipeStep" USING btree ("RecipeId");


--
-- Name: Ingredient FK_Ingredient_Foods_FoodId; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Ingredient"
    ADD CONSTRAINT "FK_Ingredient_Foods_FoodId" FOREIGN KEY ("FoodId") REFERENCES public."Foods"("Id") ON DELETE CASCADE;


--
-- Name: Ingredient FK_Ingredient_Measure_MeasureId; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Ingredient"
    ADD CONSTRAINT "FK_Ingredient_Measure_MeasureId" FOREIGN KEY ("MeasureId") REFERENCES public."Measure"("Id") ON DELETE CASCADE;


--
-- Name: Ingredient FK_Ingredient_RecipeStep_RecipeStepId; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Ingredient"
    ADD CONSTRAINT "FK_Ingredient_RecipeStep_RecipeStepId" FOREIGN KEY ("RecipeStepId") REFERENCES public."RecipeStep"("Id");


--
-- Name: Measure FK_Measure_Foods_FoodId; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Measure"
    ADD CONSTRAINT "FK_Measure_Foods_FoodId" FOREIGN KEY ("FoodId") REFERENCES public."Foods"("Id");


--
-- Name: RecipeStep FK_RecipeStep_Recipes_RecipeId; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."RecipeStep"
    ADD CONSTRAINT "FK_RecipeStep_Recipes_RecipeId" FOREIGN KEY ("RecipeId") REFERENCES public."Recipes"("Id");


--
-- PostgreSQL database dump complete
--

