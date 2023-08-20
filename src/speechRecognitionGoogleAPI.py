from google.cloud import speech_v1p1beta1 as speech
from difflib import SequenceMatcher
import asyncio  # required for API calls


# asynchronous function b/c api.
async def compare_audio(audio_file_path, text_prompt):
    # this is bad security practice, this API key will be deleted from the console after demoing. replace with your own.
    # api_key = "AIzaSyBBbqctXlhGDxPPwleJ8GSfMRCPa2xHHXE"
    audio_file = open(audio_file_path, "rb")
    # can create private key here: https://console.cloud.google.com/iam-admin/serviceaccounts/details/, this one will be deactivated after end of HT6, and another will need to be uploaded for continued use.
    service_account_info = {
        "type": "service_account",
        "project_id": "speech-to-text-ht6",
        "private_key_id": "1f755755768dfd3213622513e617720568c5f0d8",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2V83KOirj0EE/\nhXWYGXlGgr98e3lvzlNAapnyxZ7BdGOwtrMxKTeABMZjzfQDvXlOUEU0Ug5yqYyp\nu11k0zwLm8z7yavpDa3j6uP787ZarjyKIBFXeJfJnlqeTGYAXAtxL5OAfRXB+Deu\nGQfd71e67YOc5B3+dK0W4co38WutkFAYg/wxlFQzwXGubaJWNKsT6qe+sRhJDef/\nlHmY+0RKwOcR/Qfng0Cyec2/3+xtuayw+rTUA0vAgv1fi5eFf2tn0sWHz08tlpxB\n9dSleXajGKnzNYgU/XdPZ0pdHp5ylbdZ4/Jiw0HdRNEhNJzPrkFygA64Bqnvgl8Y\ntLXv/p/tAgMBAAECggEAAWpdk9oPPqz9cK2Ly+Y4uYomy+PWfb5ziX66WrbbhGNv\nqa3FZtaL0n/W/WvaHtRP9oJrgxw29f9ocuHcN/3my61GMlcusTS0up32bpyF+B69\npBHbKJtsTDmhOPTdXtfYE+UbZ0YxTsvrPLv/gmLLAs24tZVUwUatGE4g6H3EiPig\nLzkuiieVOFqhTXZxJ39oOh1BPtU+KeCaHItqezJPxP99ecgenA+aAO2mdDWGyPrY\nmfjRtNCifriKQjTb6wDEPrOX4E9mRCEMKZbuFJj0lDYl0L0QBOJgwR5+y9HYMm6N\nicZkM2Ksa62j4b/Q1vjXc6fscQl0q1MOXydE8QpcOQKBgQD42qzxBRrwfKjqcyck\nO56MPdrjWZdEEyGpjJ8oVSzrpyG+IdWnR1uWdfHoYKGBoK8PlsPzSDDEJhdQODaE\nSlxQYB2gys/FwfJgGKLWjzr6K9QH6mi+WhREga+SLyEWfqg0jCAKeYIT1xWBGWW5\n8TKmJ0gSux9oeWrGY6Eu4oorpQKBgQC7lDSBYX/eRlR0kRKa0Pae42fFW2uZhy5L\nNO0AchQOQyEffgGxTCQcMeLoVhIDZC9uhc/DXZvG89iAn2kj5+Q1FiFKhsQfGzlp\nQQ23wG5z094X9v97If3iq+DFu7HKvRRl1Lg4CANCOfu0eS3Rvc9NDGHTgCmzCsxl\nZuJrGF+QqQKBgFaWJ8R45UW16kQhKwZVZDYhs46VdqduDLFkx2AOOuIHthrkxOU+\nU+THRxN2w9tJoH/JEocMoEMvib8UwAtJoFMrDkQLLT3+3KmJCOek0H2JUG4spqNM\nzm6DvSYdFeMw0K/v7ZoXayYiGU5hGt8WyGu9kTtLNoNwc7FxqvyYQEEtAoGAJgbn\nlgsUBxWu7WqzoNsYBCIJ2YKtD5TOF8UE/wAhfLqzLlU3NqA++dBLNdqtEC7xRrCt\n6+dAO1cX3wtyHytVokV4PkmP3NaCDwp3I3dJbQXYkncqV+YOODOr/6oLYxRt3C8B\noapOLtDebDncxhZ6vh3yfxQOYBOiWDRBVoC8bvECgYEA9IQVevpr8uiox3Ge+eTh\nm6HWJSawgKe08C48TrGAqutl3KndxbMTVtTf8KP0hvaKCxOZY8oRBVJxa3DvWACH\nPOOESTBBgzJ4U85tgRWDqcR6zVtq3Xuf/qkF2UXdX4WZtNmCrsLQFoHWKUbW4HR4\nFNJNsJwMltgCbbN48GziB00=\n-----END PRIVATE KEY-----\n",
        "client_email": "ht6-559@speech-to-text-ht6.iam.gserviceaccount.com",
        "client_id": "106320819849097220439",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ht6-559%40speech-to-text-ht6.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    }

    client = speech.SpeechClient.from_service_account_info(
        service_account_info)
    with open(audio_file_path, 'rb') as audio_file:  # works by reading the audio file's binary and identifying the words spoken, by using the open(file, "rb") we are telling python to save this file as its binary representation (rb = read binary)
        audio_data = audio_file.read()
    # print("\n\n\n audio data: " + str(audio_data) + "\n\n\n")
    # RecognitionAudio object that takes in binary data
    audio = speech.RecognitionAudio(content=audio_data)
    config = speech.RecognitionConfig(  # config object to be used by the API
        encoding=speech.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=41000,  # Adjust sample rate based on your audio file
        language_code='en-US',   # Adjust language code as needed
    )
    # get results and all.
    response = client.recognize(config=config, audio=audio)
    # print(f"\n\n\nresponse print: {response}\n\n\n")
    # there can be multiple alternatives. 0 acsesses first one.
    transcript = response.results[0].alternatives[0].transcript

    similarity_percent = SequenceMatcher(
        None, text_prompt, transcript).ratio()*100
    # none - no special arguments, text_prompt & transcript are strings to compare, .ratio() makes it from 0-1, and *100 makes it a percentage

    if similarity_percent == 100:
        evaluation = "WOWZA! YOU GOT IT PERFECT, LES GOOOOO"
    elif similarity_percent > 90:
        evaluation = "Excellent job! Your reading was almost perfect."
    elif similarity_percent > 70:
        evaluation = "Great job! You read with a high level of accuracy."
    elif similarity_percent > 50:
        evaluation = "Good job! Your reading was quite accurate."
    else:
        evaluation = "Keep practicing! Your reading can improve."

    print("\n"+transcript)
    print("\nYou read the text ", similarity_percent,
          "% correctly.", evaluation)
    return ("You read the text ", similarity_percent, "% correctly.\n", evaluation)


"""TESTING PURPOSES:"""


async def main():
    result = await compare_audio("src/audio/test_1_inaccurate.mp3", "this is a test, I really hope it works")
    return result

if __name__ == "__main__":  # runs only when this file is executed directly.
    asyncio.run(main())  # Run the async main function
