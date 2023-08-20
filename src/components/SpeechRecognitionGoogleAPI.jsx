import React, { useEffect, useState } from 'react';
import { SpeechClient } from '@google-cloud/speech';
import natural from 'natural';

const SpeechRecognitionGoogleAPI = ({ audioFilePath, textPrompt }) => {
    const [evaluation, setEvaluation] = useState('');

    useEffect(() => {
        const compareAudio = async () => {
            const serviceAccountInfo = {
              type: "service_account",
              project_id: "speech-to-text-ht6",
              private_key_id: "1f755755768dfd3213622513e617720568c5f0d8",
              private_key:
                "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2V83KOirj0EE/\nhXWYGXlGgr98e3lvzlNAapnyxZ7BdGOwtrMxKTeABMZjzfQDvXlOUEU0Ug5yqYyp\nu11k0zwLm8z7yavpDa3j6uP787ZarjyKIBFXeJfJnlqeTGYAXAtxL5OAfRXB+Deu\nGQfd71e67YOc5B3+dK0W4co38WutkFAYg/wxlFQzwXGubaJWNKsT6qe+sRhJDef/\nlHmY+0RKwOcR/Qfng0Cyec2/3+xtuayw+rTUA0vAgv1fi5eFf2tn0sWHz08tlpxB\n9dSleXajGKnzNYgU/XdPZ0pdHp5ylbdZ4/Jiw0HdRNEhNJzPrkFygA64Bqnvgl8Y\ntLXv/p/tAgMBAAECggEAAWpdk9oPPqz9cK2Ly+Y4uYomy+PWfb5ziX66WrbbhGNv\nqa3FZtaL0n/W/WvaHtRP9oJrgxw29f9ocuHcN/3my61GMlcusTS0up32bpyF+B69\npBHbKJtsTDmhOPTdXtfYE+UbZ0YxTsvrPLv/gmLLAs24tZVUwUatGE4g6H3EiPig\nLzkuiieVOFqhTXZxJ39oOh1BPtU+KeCaHItqezJPxP99ecgenA+aAO2mdDWGyPrY\nmfjRtNCifriKQjTb6wDEPrOX4E9mRCEMKZbuFJj0lDYl0L0QBOJgwR5+y9HYMm6N\nicZkM2Ksa62j4b/Q1vjXc6fscQl0q1MOXydE8QpcOQKBgQD42qzxBRrwfKjqcyck\nO56MPdrjWZdEEyGpjJ8oVSzrpyG+IdWnR1uWdfHoYKGBoK8PlsPzSDDEJhdQODaE\nSlxQYB2gys/FwfJgGKLWjzr6K9QH6mi+WhREga+SLyEWfqg0jCAKeYIT1xWBGWW5\n8TKmJ0gSux9oeWrGY6Eu4oorpQKBgQC7lDSBYX/eRlR0kRKa0Pae42fFW2uZhy5L\nNO0AchQOQyEffgGxTCQcMeLoVhIDZC9uhc/DXZvG89iAn2kj5+Q1FiFKhsQfGzlp\nQQ23wG5z094X9v97If3iq+DFu7HKvRRl1Lg4CANCOfu0eS3Rvc9NDGHTgCmzCsxl\nZuJrGF+QqQKBgFaWJ8R45UW16kQhKwZVZDYhs46VdqduDLFkx2AOOuIHthrkxOU+\nU+THRxN2w9tJoH/JEocMoEMvib8UwAtJoFMrDkQLLT3+3KmJCOek0H2JUG4spqNM\nzm6DvSYdFeMw0K/v7ZoXayYiGU5hGt8WyGu9kTtLNoNwc7FxqvyYQEEtAoGAJgbn\nlgsUBxWu7WqzoNsYBCIJ2YKtD5TOF8UE/wAhfLqzLlU3NqA++dBLNdqtEC7xRrCt\n6+dAO1cX3wtyHytVokV4PkmP3NaCDwp3I3dJbQXYkncqV+YOODOr/6oLYxRt3C8B\noapOLtDebDncxhZ6vh3yfxQOYBOiWDRBVoC8bvECgYEA9IQVevpr8uiox3Ge+eTh\nm6HWJSawgKe08C48TrGAqutl3KndxbMTVtTf8KP0hvaKCxOZY8oRBVJxa3DvWACH\nPOOESTBBgzJ4U85tgRWDqcR6zVtq3Xuf/qkF2UXdX4WZtNmCrsLQFoHWKUbW4HR4\nFNJNsJwMltgCbbN48GziB00=\n-----END PRIVATE KEY-----\n",
              client_email: "ht6-559@speech-to-text-ht6.iam.gserviceaccount.com",
              client_id: "106320819849097220439",
              auth_uri: "https://accounts.google.com/o/oauth2/auth",
              token_uri: "https://oauth2.googleapis.com/token",
              auth_provider_x509_cert_url:
                "https://www.googleapis.com/oauth2/v1/certs",
              client_x509_cert_url:
                "https://www.googleapis.com/robot/v1/metadata/x509/ht6-559%40speech-to-text-ht6.iam.gserviceaccount.com",
              universe_domain: "googleapis.com",
            };

            const client = new SpeechClient({ credentials: serviceAccountInfo });

            const audioData = await fetch(audioFilePath).then(response => response.arrayBuffer());
            const audio = { content: Buffer.from(audioData) };

            const config = {
                encoding: 'MP3',
                sampleRateHertz: 41000,
                languageCode: 'en-US',
            };
            const [response] = await client.recognize({ config, audio });
            const transcript = response.results[0].alternatives[0].transcript;

            const similarity = new natural.JaroWinklerDistance().getDistance(textPrompt, transcript);
            const similarityPercent = similarity * 100;

            let newEvaluation = '';
            if (similarityPercent === 100) {
                newEvaluation = 'WOWZA! YOU GOT IT PERFECT, LES GOOOOO';
            } else if (similarityPercent > 90) {
                newEvaluation = 'Excellent job! Your reading was almost perfect.';
            } else if (similarityPercent > 70) {
                newEvaluation = 'Great job! You read with a high level of accuracy.';
            } else if (similarityPercent > 50) {
                newEvaluation = 'Good job! Your reading was quite accurate.';
            } else {
                newEvaluation = 'Keep practicing! Your reading can improve.';
            }

            setEvaluation(`You read the text ${similarityPercent.toFixed(2)}% correctly. ${newEvaluation}`);
        };

        compareAudio();
    }, [audioFilePath, textPrompt]);

    return (
        <div>
            <p>Text Prompt: {textPrompt}</p>
            <p>{evaluation}</p>
        </div>
    );
};

export default SpeechRecognitionGoogleAPI;
