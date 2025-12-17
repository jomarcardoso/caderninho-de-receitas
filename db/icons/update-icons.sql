DO $$
DECLARE
  cdn_base text := 'https://caderninho-de-receitas.appspot.com/foodicons';
BEGIN
  UPDATE "FoodIcon" fi
  SET
    "Content" = format(
      '%s/%s-%s.%s',
      cdn_base,
      fi."Id",
      NULLIF(regexp_replace(lower(COALESCE(fi."Name_En", fi."Name_Pt", 'icon')), '[^a-z0-9]+', '-', 'g'), ''),
      CASE
        WHEN lower(fi."MediaType") LIKE '%svg%' THEN 'svg'
        WHEN lower(fi."MediaType") LIKE '%png%' THEN 'png'
        WHEN lower(fi."MediaType") LIKE '%webp%' THEN 'webp'
        WHEN lower(fi."MediaType") LIKE '%jpg%' OR lower(fi."MediaType") LIKE '%jpeg%' THEN 'jpg'
        ELSE 'bin'
      END
    ),
    "MediaType" = CASE
        WHEN lower(fi."MediaType") LIKE '%svg%' THEN 'image/svg+xml'
        WHEN lower(fi."MediaType") LIKE '%png%' THEN 'image/png'
        WHEN lower(fi."MediaType") LIKE '%webp%' THEN 'image/webp'
        WHEN lower(fi."MediaType") LIKE '%jpg%' OR lower(fi."MediaType") LIKE '%jpeg%' THEN 'image/jpeg'
        ELSE 'application/octet-stream'
      END;
END $$;
