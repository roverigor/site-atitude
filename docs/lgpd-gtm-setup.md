# GTM Container Setup for LGPD Consent Mode v2

The site code pushes `gtag('consent', 'default', denied)` before the GTM script loads (see `src/components/shared/Analytics.tsx`). For this to actually block tracking tags, **each tag inside the GTM container must be marked as requiring consent**.

This is a one-time owner action that lives outside the code repo.

## Steps

1. Open Google Tag Manager (https://tagmanager.google.com) and select the container linked to `NEXT_PUBLIC_GTM_ID`.

2. For **each tag** that handles user data (GA4 Config, GA4 Events, Meta Pixel Base, Meta Pixel custom events, Google Ads conversion tracking, Google Ads remarketing, etc.), open the tag and click **Advanced Settings → Consent Settings**.

3. Select **"Require additional consent for tag to fire"** and mark the consent types according to the table below:

   | Tag type | Required consent types |
   |---|---|
   | GA4 Configuration | `analytics_storage` |
   | GA4 Events | `analytics_storage` |
   | Meta Pixel (Base + Events) | `ad_storage` |
   | Google Ads Conversion | `ad_storage`, `ad_user_data`, `ad_personalization` |
   | Google Ads Remarketing | `ad_storage`, `ad_user_data`, `ad_personalization` |
   | TikTok Pixel (if used) | `ad_storage` |
   | LinkedIn Insight (if used) | `ad_storage` |

4. **Save** each tag.

5. Click **Submit** in the top-right and **Publish** the container.

## Verification

Use GTM Preview Mode to confirm:

1. Open Preview, enter `https://atitudeensino.com.br/` in the URL field, click Connect.
2. In the Preview sidebar, look at **Consent** state for the first hit:
   - Before user decides: `analytics_storage = denied`, `ad_storage = denied`, etc.
   - Tags should show "Not fired — consent missing" or similar.
3. Accept cookies on the live banner. In Preview, observe the **Consent Update** event in the dataLayer and confirm tags now fire.

## What happens if I don't do this?

The site code still pushes `consent default denied`, but tags **without** Require Consent settings inside GTM will fire anyway — defeating the LGPD compliance. This step is non-optional.

## Modeled conversions

With Consent Mode v2 properly configured, Google fills measurement gaps for users who deny consent using statistical modeling. To enable:

- GA4 → Admin → Data collection and modification → Data collection → "Enable Google signals" + "Activate user-provided data collection"
- Google Ads → "Use modeled conversions" inside the conversion action

These are optional UX improvements; LGPD compliance is achieved purely by the consent gating in step 3.
