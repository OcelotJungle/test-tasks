--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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
-- Data for Name: guest; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.guest (id) FROM stdin;
1
2
3
4
5
\.


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.room (id, number) FROM stdin;
1	101
2	102
3	103
4	104
5	105
\.


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.booking (id, room_id, guest_id, from_date, to_date, vip) FROM stdin;
1	1	1	2022-12-01	2022-12-03	f
2	2	2	2022-12-02	2022-12-02	f
4	4	3	2022-12-04	2022-12-05	f
5	3	4	2022-12-01	2022-12-01	t
\.


--
-- Name: booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.booking_id_seq', 25, true);


--
-- Name: guest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.guest_id_seq', 5, true);


--
-- Name: room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.room_id_seq', 6, true);


--
-- PostgreSQL database dump complete
--

