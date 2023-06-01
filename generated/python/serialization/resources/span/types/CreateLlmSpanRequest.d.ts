/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as Langfuse from "../../../../api";
import * as core from "../../../../core";
export declare const CreateLlmSpanRequest: core.serialization.ObjectSchema<serializers.CreateLlmSpanRequest.Raw, Langfuse.CreateLlmSpanRequest>;
export declare namespace CreateLlmSpanRequest {
    interface Raw {
        traceId: string;
        name: string;
        startTime: string;
        parentObservationId?: string | null;
        attributes: serializers.LlmAttributes.Raw;
    }
}