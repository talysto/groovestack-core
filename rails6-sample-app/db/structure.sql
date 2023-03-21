SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: core_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    namespace character varying,
    resource_type character varying NOT NULL,
    resource_id uuid NOT NULL,
    author_type character varying NOT NULL,
    author_id uuid NOT NULL,
    body text NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: double_entry_account_balances; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.double_entry_account_balances (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    account character varying NOT NULL,
    scope character varying,
    balance bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: double_entry_line_checks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.double_entry_line_checks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    last_line_id bigint NOT NULL,
    errors_found boolean NOT NULL,
    log text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: double_entry_lines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.double_entry_lines (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    account character varying NOT NULL,
    scope character varying,
    code character varying NOT NULL,
    amount bigint NOT NULL,
    balance bigint NOT NULL,
    partner_id uuid,
    partner_account character varying NOT NULL,
    partner_scope character varying,
    detail_type character varying,
    detail_id uuid,
    metadata jsonb,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: org_unit_hierarchies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.org_unit_hierarchies (
    ancestor_id uuid NOT NULL,
    descendant_id uuid NOT NULL,
    generations integer NOT NULL
);


--
-- Name: org_units; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.org_units (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    parent_id uuid,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: things; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.things (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying,
    email character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: core_comments core_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_comments
    ADD CONSTRAINT core_comments_pkey PRIMARY KEY (id);


--
-- Name: double_entry_account_balances double_entry_account_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.double_entry_account_balances
    ADD CONSTRAINT double_entry_account_balances_pkey PRIMARY KEY (id);


--
-- Name: double_entry_line_checks double_entry_line_checks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.double_entry_line_checks
    ADD CONSTRAINT double_entry_line_checks_pkey PRIMARY KEY (id);


--
-- Name: double_entry_lines double_entry_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.double_entry_lines
    ADD CONSTRAINT double_entry_lines_pkey PRIMARY KEY (id);


--
-- Name: org_units org_units_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.org_units
    ADD CONSTRAINT org_units_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: things things_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.things
    ADD CONSTRAINT things_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_account_balances_on_account; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_account_balances_on_account ON public.double_entry_account_balances USING btree (account);


--
-- Name: index_account_balances_on_scope_and_account; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_account_balances_on_scope_and_account ON public.double_entry_account_balances USING btree (scope, account);


--
-- Name: index_core_comments_on_author_type_and_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_core_comments_on_author_type_and_author_id ON public.core_comments USING btree (author_type, author_id);


--
-- Name: index_core_comments_on_namespace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_core_comments_on_namespace ON public.core_comments USING btree (namespace);


--
-- Name: index_core_comments_on_resource_type_and_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_core_comments_on_resource_type_and_resource_id ON public.core_comments USING btree (resource_type, resource_id);


--
-- Name: line_checks_created_at_last_line_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX line_checks_created_at_last_line_id_idx ON public.double_entry_line_checks USING btree (created_at, last_line_id);


--
-- Name: lines_account_code_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lines_account_code_created_at_idx ON public.double_entry_lines USING btree (account, code, created_at);


--
-- Name: lines_account_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lines_account_created_at_idx ON public.double_entry_lines USING btree (account, created_at);


--
-- Name: lines_scope_account_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lines_scope_account_created_at_idx ON public.double_entry_lines USING btree (scope, account, created_at);


--
-- Name: lines_scope_account_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lines_scope_account_id_idx ON public.double_entry_lines USING btree (scope, account, id);


--
-- Name: org_unit_anc_desc_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX org_unit_anc_desc_idx ON public.org_unit_hierarchies USING btree (ancestor_id, descendant_id, generations);


--
-- Name: org_unit_desc_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX org_unit_desc_idx ON public.org_unit_hierarchies USING btree (descendant_id);


--
-- Name: org_units fk_rails_54c0512b74; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.org_units
    ADD CONSTRAINT fk_rails_54c0512b74 FOREIGN KEY (parent_id) REFERENCES public.org_units(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20211217172806'),
('20220822215935'),
('20230203214505'),
('20230206231054'),
('20230209165828'),
('20230209171357');


